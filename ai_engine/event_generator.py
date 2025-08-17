import datetime
import random
import json
from events import (
    FullDiagnosticTestEvent,
    GenerateTestReportEvent,
    TravelEvent,
    MemberInitiatedMessageEvent,
    ChangePlanEvent,
    ProactiveCheckInEvent,
    MemberSuggestsAmendingPlanEvent,
    InitialOnboardingEvent,
    FollowUpEvent,
    DataDrivenInsightEvent
)
from team_elyx import ELYX_TEAM

class EventGenerator:
    """Generates events for the simulation."""
    def __init__(self, start_date, end_date):
        self.start_date = start_date
        self.end_date = end_date
        self.num_weeks = (end_date - start_date).days // 7
        self.all_events = []
        self.travel_events = []

    def generate_events(self):
        """Generates all events for the simulation."""
        self._generate_initial_onboarding_event()
        self._generate_travel_events()
        self._generate_scheduled_events()
        self._generate_recurring_events()
        self._generate_random_events()
        self._generate_proactive_check_ins()
        self._generate_follow_up_events()
        self._generate_data_driven_insight_events()
        return self.all_events

    def _generate_initial_onboarding_event(self):
        """Generates the initial onboarding event."""
        with open("user.txt", "r") as f:
            user_data = f.read()
        self.all_events.append(InitialOnboardingEvent(self.start_date, user_data))

    def _is_during_travel(self, date):
        """Checks if a date is within a travel period."""
        for travel_event in self.travel_events:
            if travel_event.date <= date <= travel_event.end_date:
                return True
        return False

    def get_travel_end_date(self, date):
        """Checks if a date is within a travel period and returns the end date."""
        for travel_event in self.travel_events:
            if travel_event.date <= date <= travel_event.end_date:
                return travel_event.end_date
        return None

    def _generate_travel_events(self):
        """Generates travel events."""
        for week in range(2, self.num_weeks, 4):
            travel_start_date = self.start_date + datetime.timedelta(weeks=week) + datetime.timedelta(days=random.randint(-2, 2))
            travel_end_date = travel_start_date + datetime.timedelta(weeks=1) + datetime.timedelta(days=random.randint(-2, 2))
            travel_event = TravelEvent(travel_start_date, travel_end_date, "Business Trip")
            self.all_events.append(travel_event)
            self.travel_events.append(travel_event)

    def _generate_scheduled_events(self):
        """Generates scheduled events based on the problem statement."""
        self.all_events.extend([
            FullDiagnosticTestEvent(self.start_date + datetime.timedelta(weeks=1), "First diagnostic test"),
            GenerateTestReportEvent(self.start_date + datetime.timedelta(weeks=1, days=1), "Generate report for first test"),
            FullDiagnosticTestEvent(self.start_date + datetime.timedelta(weeks=12), "Second diagnostic test"),
            GenerateTestReportEvent(self.start_date + datetime.timedelta(weeks=12, days=1), "Generate report for second test"),
            FullDiagnosticTestEvent(self.start_date + datetime.timedelta(weeks=24), "Third diagnostic test"),
            GenerateTestReportEvent(self.start_date + datetime.timedelta(weeks=24, days=1), "Generate report for third test"),
        ])

    def _generate_recurring_events(self):
        """Generates recurring events."""
        # Exercise plan updates (every 2 weeks)
        for week in range(2, self.num_weeks, 2):
            update_date = self.start_date + datetime.timedelta(weeks=week)
            travel_end_date = self.get_travel_end_date(update_date)
            if travel_end_date:
                update_date = travel_end_date + datetime.timedelta(days=1)

            self.all_events.append(ChangePlanEvent(update_date, ELYX_TEAM["Rachel"], "Here is your updated exercise plan."))
            if random.random() < 0.5:
                amend_date = update_date + datetime.timedelta(days=random.randint(1, 3))
                if not self._is_during_travel(amend_date):
                    self.all_events.append(MemberSuggestsAmendingPlanEvent(amend_date, "I'd like to amend the new plan."))

    def _generate_random_events(self):
        """Generates random events."""
        questions = [
            "I've been having trouble sleeping lately, can we look into this?",
            "I'm feeling a bit run down, any suggestions for boosting my energy levels?",
            "I'm traveling next week, how should I adjust my workout plan?",
            "I've been sticking to the new diet, but I'm not seeing the results I expected.",
            "Can you explain the results of my latest blood test in more detail?",
            "I'm feeling some pain in my knee after my last run, should I be concerned?",
            "I'm looking for a new supplement to help with focus, any recommendations?",
            "I'm struggling to find time for my workouts with my current schedule.",
            "I've been feeling more stressed than usual, any advice on how to manage it?",
            "I'm curious about the latest research on longevity, can you share some insights?",
            "I want to try a new type of workout, what would you recommend?"
        ]

        # Member initiated questions (average of 5 per week)
        for week in range(self.num_weeks):
            num_messages = random.choices([4, 5, 6], weights=[0.3, 0.4, 0.3])[0]
            for _ in range(num_messages):
                day_of_week = self._get_random_day_of_week()
                event_date = self.start_date + datetime.timedelta(weeks=week) + datetime.timedelta(days=day_of_week)
                if self._is_during_travel(event_date):
                    if random.random() > 0.2: # 80% chance of not sending a message
                        continue
                self.all_events.append(MemberInitiatedMessageEvent(event_date, random.choice(questions)))

    def _generate_proactive_check_ins(self):
        """Generates proactive check-ins from the team."""
        for day in range(self.num_weeks * 7):
            if random.random() < 1/8: # Average once every 8 days
                event_date = self.start_date + datetime.timedelta(days=day)
                if self._is_during_travel(event_date):
                    if random.random() > 0.5: # 50% chance of not sending a message
                        continue
                team_member = random.choice(list(ELYX_TEAM.values()))
                self.all_events.append(ProactiveCheckInEvent(event_date, team_member, "Just checking in to see how you are doing."))

    def _generate_follow_up_events(self):
        """Generates follow-up events from the team."""
        try:
            with open("expert_recommendations.json", "r") as f:
                recommendations = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            recommendations = []

        for rec in recommendations:
            if random.random() < 0.3: # 30% chance of follow-up
                expert_name = rec["expert_name"]
                recommendation = rec["recommendations"]
                expert = ELYX_TEAM.get(expert_name)
                if expert:
                    event_date = datetime.datetime.fromisoformat(rec["timestamp"]).date() + datetime.timedelta(days=random.randint(3, 7))
                    if event_date <= self.end_date:
                        self.all_events.append(FollowUpEvent(event_date, expert, json.dumps(recommendation)))

    def _generate_data_driven_insight_events(self):
        """Generates data-driven insight events from Advik."""
        for week in range(1, self.num_weeks):
            if random.random() < 0.25: # 25% chance of an insight each week
                day_of_week = self._get_random_day_of_week()
                event_date = self.start_date + datetime.timedelta(weeks=week) + datetime.timedelta(days=day_of_week)
                if not self._is_during_travel(event_date):
                    insight = "I've noticed a trend in your sleep data..."
                    self.all_events.append(DataDrivenInsightEvent(event_date, ELYX_TEAM["Advik"], insight))

    def _get_random_day_of_week(self):
        """Returns a random day of the week, with weekdays being more likely."""
        return random.choices(range(7), weights=[0.15, 0.15, 0.15, 0.15, 0.15, 0.1, 0.1])[0]