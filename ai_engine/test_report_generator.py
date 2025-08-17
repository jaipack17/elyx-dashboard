
from together import Together
import json

class TestReportGenerator:
    """Generates a pseudo-realistic test report using an LLM."""

    def __init__(self, model_name="openai/gpt-oss-20b"):
        self.model_name = model_name
        self.client = Together()
        self.test_panels = [
            "General Health Assessment",
            "Cancer Screening",
            "Advanced Cardiovascular Assessment",
            "Overall health and fitness",
            "Genetic Testing",
            "Body Composition Analysis",
            "Hormone Profiling",
            "Nutritional Assessment",
            "Brain Health Assessment",
            "Skin Analysis",
            "Extended care"
        ]

    def _generate_panel_content(self, user_memory, panel_name, generated_tests):
        """Generates the content for a specific test panel."""
        prompt = f"""
        You are a medical data generation assistant. Based on the following user memory, generate a list of tests and their results for the "{panel_name}" panel.
        The values in the report should be pseudo-realistic and consistent with the user's memory.
        
        Do not generate tests that are already in this list: {list(generated_tests)}
        If you must repeat a test, ensure the value is consistent.

        Respond with ONLY a JSON object containing a list of tests, where each test is an object with "test_name" and "result".

        User Memory:
        {user_memory}

        Example for "General Health Assessment":
        {{
            "tests": [
                {{ "test_name": "Blood Pressure", "result": "120/80 mmHg" }},
                {{ "test_name": "Heart Rate", "result": "65 bpm" }}
            ]
        }}

        JSON Output:
        """
        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content

    def generate_report(self, user_memory):
        """Generates a test report based on the user's memory and returns it as a JSON object."""
        print(f"--- TestReportGenerator received user memory: {user_memory} ---")

        report = {"test_report": []}
        generated_tests = set()

        for panel_name in self.test_panels:
            print(f"  Generating content for panel: {panel_name}")
            try:
                panel_content_str = self._generate_panel_content(user_memory, panel_name, generated_tests)
                panel_content = json.loads(panel_content_str)
                tests = panel_content.get("tests", [])
                
                # Filter out already generated tests
                new_tests = [test for test in tests if isinstance(test, dict) and test.get("test_name") not in generated_tests]
                
                report["test_report"].append({
                    "panel_name": panel_name,
                    "tests": new_tests
                })
                
                for test in new_tests:
                    generated_tests.add(test["test_name"])

            except (json.JSONDecodeError, AttributeError) as e:
                print(f"Failed to generate content for panel {panel_name}: {e}")
                report["test_report"].append({
                    "panel_name": panel_name,
                    "tests": [{"test_name": "Error generating content", "result": str(e)}]
                })

        return json.dumps(report, indent=4)
