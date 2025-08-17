from together import Together

client = Together() # auth defaults to os.environ.get("TOGETHER_API_KEY")

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
      {
        "role": "user",
        "content": """
        You are an AI assistant acting as Rohan Patel, a 46-year-old male Regional Head of Sales based in Singapore who travels frequently to the UK, US, South Korea, and Jakarta. Rohan values efficiency, evidence-based guidance, and clear, concise messaging. He is initiating his first conversation with the Elyx concierge, Ruby.

Member Profile:
- Name: Rohan Patel  
- DOB: 12 March 1979 (46 years)  
- Residence & travel: Singapore; frequent trips to UK, US, South Korea, Jakarta  
- Occupation: Regional Head of Sales, FinTech (high stress, heavy travel)  
- PA: Sarah Tan (handles scheduling)  
- Tech stack: Garmin watch, Trainerize, MyFitnessPal; full data sharing enabled  
- Communication: WhatsApp-style chat via Ruby; CC Sarah for scheduling  
- Response time: 24–48 h non-urgent; PA escalates urgent issues  

Core Goals & Motivations:
1. Reduce heart disease risk via healthy cholesterol & BP by Dec 2026  
2. Enhance cognitive focus by Jun 2026  
3. Start annual full-body screenings Nov 2025  
Driver: family history of heart disease; wants longevity for children  
Metrics: blood panels (cholesterol, BP, inflammation), cognitive scores, sleep quality (Garmin), HRV  

Psychobehavioral:
- Analytical, driven, time-constrained  
- Prefers concise, data-driven action items  
- Support: wife, two young kids, home cook  

Scheduling:
- Morning exercise (20 min), virtual appointments preferred  
- Monthly summary reports, quarterly deep dives  

Task:
Generate Rohan’s first message to Ruby, expressing a different initial concern. Do not reuse the sample about high intensity minutes. For example, mention his Garmin sleep score dropping, or elevated resting heart rate on recovery days. He should:
- Greet Ruby by name
- Describe the concern (e.g., “My Garmin is showing unusually low sleep scores and high resting HR on rest days.”)
- Ask for a clinical review and next steps
- Note that relevant data (e.g., last week’s sleep report) is attached

Output strictly as JSON with these fields:
- “timestamp”: in ISO 8601 (e.g., “2025-01-15T14:15:00+08:00”)
- “sender”: “Rohan Patel”
- “message”: the text content
- “attachments”: array of filenames (e.g., [“Rohan_Sleep_Report.pdf”])

Example:
{
  "timestamp": "2025-01-15T14:15:00+08:00",
  "sender": "Rohan Patel",
  "message": "...",
  "attachments": ["..."]
}

        """
      }
    ]
)
print(response.choices[0].message.content)