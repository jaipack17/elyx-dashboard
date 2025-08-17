import datetime
from together import Together

class Event:
    """Base class for all events."""
    def __init__(self, date, description):
        self.date = date
        self.description = description

class InitialOnboardingEvent(Event):
    """Event for the initial onboarding of a new member."""
    def __init__(self, date, user_data):
        super().__init__(date, "Initial onboarding for Rohan Patel")
        self.user_data = user_data
        self.client = Together()

    def generate_initial_message(self):
        """Generates the initial message from the member based on the user data."""
        prompt = f"""
        You are Rohan Patel, a 46-year-old male Regional Head of Sales. You are sending your first message to the Elyx concierge, Ruby, to kickstart your health and wellness journey.

        Based on your detailed profile below, craft a concise, WhatsApp-style message to Ruby. In the message, you should:
        1.  Briefly introduce yourself.
        2.  Mention your primary health concerns (heart disease risk, cognitive performance).
        3.  State your main goals (longevity for family, sustained career performance).
        4.  Express your motivation and readiness to start.

        Your Profile:
        {self.user_data}

        Your message to Ruby:
        """
        response = self.client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

class FullDiagnosticTestEvent(Event):
    """Event for a full diagnostic test."""
    pass

class GenerateTestReportEvent(Event):
    """Event to generate a test report."""
    pass

class TravelEvent(Event):
    """Event for member travel."""
    def __init__(self, start_date, end_date, destination):
        super().__init__(start_date, f"Travel to {destination}")
        self.end_date = end_date
        self.destination = destination

class MemberInitiatedMessageEvent(Event):
    """Event for a message initiated by the member."""
    def __init__(self, date, message):
        super().__init__(date, f"Member initiated message: {message}")
        self.message = message
        self.client = Together()

    def generate_initial_message(self, context, history):
        """Generates the initial message from the member based on the conversational context."""
        prompt = f"""
        You are Rohan Patel, a 46-year-old male Regional Head of Sales. You are a real person with emotions, concerns, and a busy life. Your communication should reflect that.

        Based on the following context and recent conversation history, generate a natural, WhatsApp-style message. You might be feeling frustrated, curious, or forgetful. Your message should be concise (1-3 sentences) and raise a specific health question or concern. Avoid using clinical jargon.

        Context from previous conversations:
        {context}

        Recent conversation history:
        {history}

        Your message:
        """
        response = self.client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

class ChangePlanEvent(Event):
    """Event for a message initiated by the Elyx team to change the plan."""
    def __init__(self, date, team_member, message):
        super().__init__(date, f"{team_member.name} initiated message: {message}")
        self.team_member = team_member
        self.message = message

class ProactiveCheckInEvent(Event):
    """Event for a proactive check-in from the Elyx team."""
    def __init__(self, date, team_member, message):
        super().__init__(date, f"{team_member.name} proactively checks in: {message}")
        self.team_member = team_member
        self.message = message

class MemberSuggestsAmendingPlanEvent(Event):
    """Event for when the member suggests amending the plan."""
    def __init__(self, date, suggestion):
        super().__init__(date, f"Member suggests amending plan: {suggestion}")
        self.suggestion = suggestion

class FollowUpEvent(Event):
    """Event for following up on previous recommendations."""
    def __init__(self, date, team_member, recommendation):
        super().__init__(date, f"{team_member.name} is following up on: {recommendation}")
        self.team_member = team_member
        self.recommendation = recommendation

class DataDrivenInsightEvent(Event):
    """Event for sharing insights from user data."""
    def __init__(self, date, team_member, insight):
        super().__init__(date, f"{team_member.name} has a data-driven insight: {insight}")
        self.team_member = team_member
        self.insight = insight
