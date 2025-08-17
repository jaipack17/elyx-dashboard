import json
import datetime
import random
from together import Together
from team_elyx import ELYX_TEAM, Member
from events import ChangePlanEvent, MemberSuggestsAmendingPlanEvent

class Conversation:
    """Represents a single conversation."""

    def __init__(self, participants):
        self.participants = participants
        self.messages = []

    def add_message(self, author, message):
        """Adds a message to the conversation."""
        self.messages.append(f"{author.name}: {message}")

class ConversationManager:
    """Manages the flow of a conversation."""

    def __init__(self, conversation):
        self.conversation = conversation
        self.client = Together()

    def generate_conversation(self, initial_message, conversation_history, event=None):
        """Generates a full conversation based on an initial message."""
        print(f"--- generate_conversation received event type: {type(event)} ---")
        member = self.conversation.participants["Member"]
        self.conversation.add_message(member, initial_message)

        concierge = ELYX_TEAM["Ruby"]
        expert = self._get_expert(initial_message)

        if not expert or random.random() < 0.3: # 30% chance Ruby handles it
            concierge_reply = concierge.generate_message(f"The member said: {initial_message}", conversation_history)
            self.conversation.add_message(concierge, concierge_reply)
        else:
            print("--- Expert interaction branch taken ---")
            concierge_reply = concierge.generate_message(f"The member said: {initial_message}. I'm looping in {expert.name} to help with this.", conversation_history)
            self.conversation.add_message(concierge, concierge_reply)
            
            # Expert interaction
            expert_reply = expert.generate_message(f"The member said: {initial_message}", conversation_history)
            self.conversation.add_message(expert, expert_reply)
            self.conversation.participants[expert.name] = expert

            # Chance for a follow-up question
            if "?" in expert_reply and random.random() < 0.4: # 40% chance of follow-up
                print("--- Follow-up question branch taken ---")
                member_follow_up = member.generate_message(f"In response to the expert's question: {expert_reply}", conversation_history)
                self.conversation.add_message(member, member_follow_up)
                final_expert_reply = expert.generate_message(f"The member provided more information: {member_follow_up}", conversation_history)
                self.conversation.add_message(expert, final_expert_reply)
                print(f"--- Checking condition: {event and isinstance(event, (ChangePlanEvent, MemberSuggestsAmendingPlanEvent))} ---")
                if event and isinstance(event, (ChangePlanEvent, MemberSuggestsAmendingPlanEvent)):
                    print("--- Condition met, calling _extract_and_log_recommendations ---")
                    self._extract_and_log_recommendations(expert.name, final_expert_reply, event)
                    self._log_to_notepad(expert.name, final_expert_reply)
            else:
                print("--- No follow-up question branch taken ---")
                print(f"--- Checking condition: {event and isinstance(event, (ChangePlanEvent, MemberSuggestsAmendingPlanEvent))} ---")
                if event and isinstance(event, (ChangePlanEvent, MemberSuggestsAmendingPlanEvent)):
                    print("--- Condition met, calling _extract_and_log_recommendations ---")
                    self._extract_and_log_recommendations(expert.name, expert_reply, event)
                    self._log_to_notepad(expert.name, expert_reply)

        return {
            "conversation_string": "\n".join(self.conversation.messages),
            "participants": self.conversation.participants
        }

    def generate_plan_deliberation_conversation(self, initial_message, conversation_history, event=None):
        """Generates a deliberation conversation for a plan change."""
        print(f"--- generate_plan_deliberation_conversation received event type: {type(event)} ---")
        
        member = self.conversation.participants["Member"]
        concierge = self.conversation.participants["Ruby"]
        dr_warren = self.conversation.participants["Dr. Warren"]
        rachel = self.conversation.participants["Rachel"]

        # 1. Concierge starts the conversation
        self.conversation.add_message(concierge, initial_message)
        
        # 2. Rohan's input
        rohan_input_prompt = "Thanks for the update. Here's what's on my mind..."
        rohan_input = member.generate_message(rohan_input_prompt, conversation_history)
        self.conversation.add_message(member, rohan_input)
        
        # 3. Expert deliberation
        dr_warren_prompt = f"Based on Rohan's input, here are my medical suggestions: {rohan_input}"
        dr_warren_suggestion = dr_warren.generate_message(dr_warren_prompt, conversation_history)
        self.conversation.add_message(dr_warren, dr_warren_suggestion)
        
        rachel_prompt = f"Building on Dr. Warren's points and Rohan's input, here are my exercise recommendations: {rohan_input}"
        rachel_suggestion = rachel.generate_message(rachel_prompt, conversation_history)
        self.conversation.add_message(rachel, rachel_suggestion)
        
        # 4. Final plan extraction
        full_conversation = "\n".join(self.conversation.messages)
        self._extract_and_log_recommendations("Team Elyx", full_conversation, event)
        
        return {
            "conversation_string": full_conversation,
            "participants": self.conversation.participants
        }

    def _get_expert(self, message):
        """Decides which expert to refer the conversation to based on keywords."""
        message_lower = message.lower()
        expert_keywords = {
            "Dr. Warren": ["medical", "doctor", "physician", "blood test", "screening", "heart"],
            "Advik": ["data", "sleep", "hrv", "recovery", "stress", "garmin", "oura"],
            "Carla": ["nutrition", "diet", "food", "supplement", "cgm"],
            "Rachel": ["workout", "exercise", "pain", "injury", "mobility", "strength"],
            "Neel": ["strategic", "review", "frustration", "goal", "value"]
        }

        matching_experts = []
        for expert, keywords in expert_keywords.items():
            if any(keyword in message_lower for keyword in keywords):
                matching_experts.append(expert)

        if not matching_experts:
            return ELYX_TEAM.get(random.choice(list(ELYX_TEAM.keys())))

        # 50% chance to pick a random expert from the matching ones
        if random.random() < 0.5:
            expert_name = random.choice(matching_experts)
        else:
            # Otherwise, use the LLM to pick the best one
            prompt = f"""
            Based on the following message, which of these experts is the most relevant? 
            Experts: {matching_experts}
            Respond with ONLY the expert's name.

            Message: {message}

            Expert:
            """
            response = self.client.chat.completions.create(
                model="openai/gpt-oss-20b",
                messages=[{"role": "user", "content": prompt}]
            )
            expert_name = response.choices[0].message.content.strip()
            if expert_name not in matching_experts:
                expert_name = random.choice(matching_experts)

        return ELYX_TEAM.get(expert_name)

    def _extract_and_log_recommendations(self, expert_name, expert_reply, event=None):
        """Extracts recommendations from the expert's reply and logs them."""
        print(f"--- _extract_and_log_recommendations called for expert: {expert_name} ---")

        if event and isinstance(event, ChangePlanEvent):
            prompt = f"""
            You are a data extraction assistant. Your task is to generate a comprehensive health and wellness plan based on the following text. The plan should be detailed and actionable, with specific recommendations in each category.

            The health profile categories are: "medicines", "supplements", "workouts", "trackers", "dietary_recommendations", "lifestyle_recommendations".

            Generate a complete plan with recommendations in all relevant categories. Provide a reasonable number of recommendations in each category.

            Text: {expert_reply}

            JSON Output:
            """
        else:
            prompt = f"""
            You are a data extraction assistant. Your task is to identify and extract specific, actionable recommendations from a given text and format them into a JSON object.

            The health profile categories are: "medicines", "supplements", "workouts", "trackers", "dietary_recommendations", "lifestyle_recommendations".

            From the following text, extract any recommendations that fit into these categories. If no recommendations are found for a category, do not include the key in the JSON.

            Text: {expert_reply}

            JSON Output:
            """
        
        response = self.client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        try:
            recommendations = json.loads(response.choices[0].message.content)
            
            if recommendations:
                # Log to expert_recommendations.json
                recommendation_log_entry = {
                    "timestamp": datetime.datetime.now().isoformat(),
                    "expert_name": expert_name,
                    "recommendations": recommendations
                }
                try:
                    with open("expert_recommendations.json", "r+") as f:
                        data = json.load(f)
                        data.append(recommendation_log_entry)
                        f.seek(0)
                        json.dump(data, f, indent=4)
                except (FileNotFoundError, json.JSONDecodeError):
                    with open("expert_recommendations.json", "w") as f:
                        json.dump([recommendation_log_entry], f, indent=4)

                # Update health_profile.json
                try:
                    with open("health_profile.json", "r+") as f:
                        health_profile = json.load(f)
                        for category, items in recommendations.items():
                            if category in health_profile and isinstance(items, list):
                                health_profile[category].extend(items)
                        f.seek(0)
                        json.dump(health_profile, f, indent=4)
                except (FileNotFoundError, json.JSONDecodeError):
                    with open("health_profile.json", "w") as f:
                        json.dump(recommendations, f, indent=4)

        except (json.JSONDecodeError, AttributeError) as e:
            print(f"Could not parse or process recommendations: {e}")
            print(f"Raw response from LLM: {response.choices[0].message.content}")

    def _log_to_notepad(self, expert_name, expert_reply):
        """Extracts medicines, treatments, and tests and logs them to a notepad."""
        prompt = f"""
        You are a data extraction assistant. Your task is to identify any medicines, treatments, or tests from the following text and format them into a JSON list of objects.
        For each item, provide the item type (medicine, treatment, or test), the item name, and the reasoning behind it.

        Text: {expert_reply}

        JSON Output (should be a list of objects):
        """
        response = self.client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )

        try:
            notepad_entries = json.loads(response.choices[0].message.content)

            if notepad_entries:
                # Ensure notepad_entries is a list
                if not isinstance(notepad_entries, list):
                    notepad_entries = [notepad_entries]

                try:
                    with open("notepad.json", "r+") as f:
                        try:
                            data = json.load(f)
                            if not isinstance(data, list):
                                data = []
                        except json.JSONDecodeError:
                            data = []
                        data.extend(notepad_entries)
                        f.seek(0)
                        f.truncate()
                        json.dump(data, f, indent=4)
                except FileNotFoundError:
                    with open("notepad.json", "w") as f:
                        json.dump(notepad_entries, f, indent=4)
        except (json.JSONDecodeError, AttributeError) as e:
            print(f"Could not parse or process notepad entries: {e}")
            print(f"Raw response from LLM: {response.choices[0].message.content}")
