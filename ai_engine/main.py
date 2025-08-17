import datetime
import json
from team_elyx import ELYX_TEAM, Member
from event_generator import EventGenerator
from communication import generate_communication, get_context_summary
from vector_db import VectorDB
from test_report_generator import TestReportGenerator
from events import GenerateTestReportEvent, MemberInitiatedMessageEvent, TravelEvent, ProactiveCheckInEvent, InitialOnboardingEvent, FollowUpEvent, DataDrivenInsightEvent, ChangePlanEvent, MemberSuggestsAmendingPlanEvent
from conversation import Conversation, ConversationManager
from history import ConversationHistory

def run_simulation():
    """Runs the 8-month simulation."""
    start_date = datetime.date(2025, 1, 15)
    end_date = start_date + datetime.timedelta(days=240) # 8 months

    event_generator = EventGenerator(start_date, end_date)
    events = event_generator.generate_events()

    vector_db = VectorDB()
    conversation_history = ConversationHistory()
    test_report_generator = TestReportGenerator()

    all_conversations = [] # To store all generated conversations
    all_conversations_json = [] # To store all conversation objects for JSON output
    report_counter = 0
    expert_message_counts = {}

    current_date = start_date
    while current_date <= end_date:
        print(f"Simulating day: {current_date}")

        for event in sorted(events, key=lambda x: x.date):
            if event.date == current_date:
                conversation_obj = {
                    "date": current_date.isoformat(),
                    "event_type": event.__class__.__name__,
                    "event_description": event.description,
                    "conversation": [],
                    "participants": []
                }

                if isinstance(event, InitialOnboardingEvent):
                    print(f"  Processing event: {event.description}")
                    initial_message = event.generate_initial_message()
                    
                    conversation = Conversation(participants={"Member": Member(), "Concierge": ELYX_TEAM["Ruby"]})
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_conversation(initial_message, conversation_history=[], event=event)
                    full_conversation = conversation_data["conversation_string"]
                    
                    print(full_conversation)
                    all_conversations.append(f"\n## Initial Onboarding on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())

                elif isinstance(event, GenerateTestReportEvent):
                    print(f"  Processing event: {event.description}")
                    user_memory = conversation_history.get_history()
                    print(f"--- Generating report with user memory: {user_memory} ---")
                    report_json_str = test_report_generator.generate_report(user_memory)
                    
                    try:
                        report_data = json.loads(report_json_str)
                        report_counter += 1
                        file_path = f"test_report_{report_counter}.json"
                        with open(file_path, "w") as f:
                            json.dump(report_data, f, indent=4)
                        print(f"Successfully saved test report to {file_path}")
                        all_conversations.append(f"\n## Test Report Generated: {file_path} on {current_date}\n")
                        conversation_obj["conversation"] = f"Test Report Generated: {file_path}"
                    except json.JSONDecodeError as e:
                        print(f"Failed to decode JSON for report: {e}")
                        print(f"Problematic JSON string from generate_report: {report_json_str}")
                
                elif isinstance(event, TravelEvent):
                    print(f"  Processing event: {event.description}")
                    travel_data = {
                        "start_date": event.date.isoformat(),
                        "end_date": event.end_date.isoformat(),
                        "destination": event.destination,
                        "duration_days": (event.end_date - event.date).days
                    }
                    try:
                        with open("travel_log.json", "r+") as f:
                            data = json.load(f)
                            data.append(travel_data)
                            f.seek(0)
                            json.dump(data, f, indent=4)
                    except (FileNotFoundError, json.JSONDecodeError):
                        with open("travel_log.json", "w") as f:
                            json.dump([travel_data], f, indent=4)
                    all_conversations.append(f"\n## Travel Logged: {event.description} from {event.date} to {event.end_date}\n")
                    
                    initial_message = f"Hi Rohan, I see you're on a business trip to {event.destination}. Hope you're settling in well. Let me know if you need any adjustments to your health plan while you're away."
                    
                    conversation = Conversation(participants={"Member": Member(), "Concierge": ELYX_TEAM["Ruby"]})
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_conversation(initial_message, conversation_history=[], event=event)
                    full_conversation = conversation_data["conversation_string"]

                    print(full_conversation)
                    all_conversations.append(f"\n## Travel Check-in on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())

                elif isinstance(event, ProactiveCheckInEvent):
                    print(f"  Processing event: {event.description}")
                    context_summary = get_context_summary(vector_db)
                    expert = event.team_member
                    check_in_message = expert.generate_message(f"Based on the user's recent activity, I should check in about: {context_summary}")
                    
                    conversation = Conversation(participants={"Member": Member(), expert.name: expert})
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_conversation(check_in_message, conversation_history=conversation_history.get_history(), event=event)
                    full_conversation = conversation_data["conversation_string"]

                    print(full_conversation)
                    all_conversations.append(f"\n## Proactive Check-in on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())

                elif isinstance(event, FollowUpEvent):
                    print(f"  Processing event: {event.description}")
                    expert = event.team_member
                    follow_up_message = expert.generate_message(f"I'm following up on this recommendation: {event.recommendation}")
                    
                    conversation = Conversation(participants={"Member": Member(), expert.name: expert})
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_conversation(follow_up_message, conversation_history=conversation_history.get_history(), event=event)
                    full_conversation = conversation_data["conversation_string"]

                    print(full_conversation)
                    all_conversations.append(f"\n## Follow-up on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())

                elif isinstance(event, DataDrivenInsightEvent):
                    print(f"  Processing event: {event.description}")
                    expert = event.team_member
                    insight_message = expert.generate_message(f"I have a data-driven insight to share: {event.insight}")
                    
                    conversation = Conversation(participants={"Member": Member(), expert.name: expert})
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_conversation(insight_message, conversation_history=conversation_history.get_history(), event=event)
                    full_conversation = conversation_data["conversation_string"]

                    print(full_conversation)
                    all_conversations.append(f"\n## Data-Driven Insight on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())

                elif isinstance(event, MemberInitiatedMessageEvent):
                    print(f"  Processing event: {event.description}")
                    context = vector_db.search(event.description)
                    history = conversation_history.get_history()
                    initial_message = event.generate_initial_message(context, history)
                    
                    conversation = Conversation(participants={"Member": Member(), "Concierge": ELYX_TEAM["Ruby"]})
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_conversation(initial_message, conversation_history=history, event=event)
                    full_conversation = conversation_data["conversation_string"]
                    
                    print(full_conversation)
                    all_conversations.append(f"\n## Conversation on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())

                elif isinstance(event, ChangePlanEvent):
                    print(f"  Processing event: {event.description}")
                    initial_message = event.message
                    
                    # For ChangePlanEvent, we have a deliberation with multiple experts
                    participants = {
                        "Member": Member(), 
                        "Ruby": ELYX_TEAM["Ruby"], 
                        "Dr. Warren": ELYX_TEAM["Dr. Warren"], 
                        "Rachel": ELYX_TEAM["Rachel"]
                    }
                    conversation = Conversation(participants=participants)
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_plan_deliberation_conversation(initial_message, conversation_history=conversation_history.get_history(), event=event)
                    full_conversation = conversation_data["conversation_string"]
                    
                    print(full_conversation)
                    all_conversations.append(f"\n## Conversation on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())
                elif isinstance(event, MemberSuggestsAmendingPlanEvent):
                    print(f"  Processing event: {event.description}")
                    initial_message = event.suggestion
                    
                    # For MemberSuggestsAmendingPlanEvent, we have a deliberation with multiple experts
                    participants = {
                        "Member": Member(), 
                        "Ruby": ELYX_TEAM["Ruby"], 
                        "Dr. Warren": ELYX_TEAM["Dr. Warren"], 
                        "Rachel": ELYX_TEAM["Rachel"]
                    }
                    conversation = Conversation(participants=participants)
                    conversation_manager = ConversationManager(conversation)
                    conversation_data = conversation_manager.generate_plan_deliberation_conversation(initial_message, conversation_history=conversation_history.get_history(), event=event)
                    full_conversation = conversation_data["conversation_string"]
                    
                    print(full_conversation)
                    all_conversations.append(f"\n## Conversation on {current_date}\n{full_conversation}\n")
                    vector_db.add_message(full_conversation, metadata={"date": str(current_date)})
                    conversation_history.add_message(full_conversation)
                    conversation_obj["conversation"] = conversation.messages
                    conversation_obj["participants"] = list(conversation.participants.keys())
                else:
                    print(f"  Processing event: {event.description}")
                    conversation_str = generate_communication(event, vector_db, conversation_history)
                    print(conversation_str)
                    all_conversations.append(f"\n## Communication on {current_date}\n{conversation_str}\n")
                    vector_db.add_message(conversation_str, metadata={"date": str(current_date)})
                    conversation_history.add_message(conversation_str)
                    conversation_obj["conversation"] = conversation_str.split('\n')
                
                # Count expert messages
                if "conversation_data" in locals():
                    for author in conversation_data["participants"].values():
                        if author.name != "Rohan Patel" and author.name != "Ruby":
                            expert_message_counts[author.name] = expert_message_counts.get(author.name, 0) + 1

                all_conversations_json.append(conversation_obj)

        current_date += datetime.timedelta(days=1)
    
    with open("elyx_conversations.md", "w") as f:
        for conv in all_conversations:
            f.write(conv)

    with open("all_conversations.json", "w") as f:
        json.dump(all_conversations_json, f, indent=4)

    # Calculate and save expert time summary
    expert_time = {expert: count * 5 for expert, count in expert_message_counts.items()} # 5 minutes per message
    with open("expert_time_summary.json", "w") as f:
        json.dump(expert_time, f, indent=4)
    print("Successfully generated expert time summary.")

if __name__ == "__main__":
    run_simulation()
