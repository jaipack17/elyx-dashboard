# Elyx Simulation

[](https://img.shields.io/badge/AI_ENGINE_like-blue)

#### This document describes how to run the Elyx simulation. The synthetic data set is generated with the help of python scripts which are present in the `ai_engine` folder.

## Multi-Agent Architecture

### NOTE: The prompts for various agents are present inside `team_elyx.py` file

The simulation employs a multi-agent architecture to model the interactions between the user and the Elyx team. The agents are:

*   **The Member (Rohan Patel)**: The user of the Elyx service. The member's behavior and messages are generated based on a predefined set of events and goals.
*   **The Concierge (Ruby)**: The primary point of contact for the member. The concierge handles initial triage of messages, answers basic questions, and escalates to the appropriate expert when necessary.
*   **The Experts**: A team of specialists who provide expert advice in their respective fields. The experts are:
    *   **Dr. Warren**: A physician who provides medical advice.
    *   **Rachel**: An exercise physiologist who creates and adjusts workout plans.
    *   **Advik**: A data scientist who analyzes data from wearables and provides data-driven insights.
    *   **Carla**: A nutritionist who provides advice on diet and supplements.
    *   **Neel**: A strategic advisor who helps the member with goal setting and overall strategy.

Each agent is powered by a large language model (LLM) and has a specific persona and knowledge base, allowing for realistic and dynamic conversations.

### Technical Aspects

<img width="1280" height="648" alt="image" src="https://github.com/user-attachments/assets/c1ef8f48-43fe-4641-9de8-b4cc9dcb2ef9" />

The multi-agent architecture is supported by several key technical components:

*   **Vector Database**: The simulation uses a vector database (ChromaDB) to provide long-term memory and context for the agents. All conversations are added to the vector database, allowing the agents to retrieve relevant information from past conversations when generating responses. This gives the agents a sense of history and allows them to have more contextually aware conversations.
*   **Conversation History**: In addition to the vector database, a simpler form of short-term memory is maintained through the conversation history. This history is a chronological log of the messages in the current conversation, and it is used to provide immediate context for the agents.
*   **Test Report Generation**: The simulation includes a `TestReportGenerator` that uses an LLM to generate pseudo-realistic test reports. These reports are based on the user's memory (a summary of their health profile and recent conversations) and are used to trigger events and conversations related to the user's health data. This adds a layer of realism to the simulation and allows for more data-driven interactions.
*   **Event-Driven Architecture**: The simulation is event-driven. The `EventGenerator` creates a series of events that drive the simulation forward. These events can be scheduled, recurring, or random, and they trigger conversations and interactions between the agents. This event-driven approach allows for a flexible and extensible simulation that can be easily modified to model different scenarios.

## Output Files

The simulation generates several output files:

*   **`all_conversations.json`**: A JSON file containing a detailed log of all conversations generated during the simulation. Each conversation includes the date, event type, event description, the full conversation, and the participants.
*   **`elyx_conversations.md`**: A markdown file that presents the conversations in a more human-readable format.
*   **`expert_time_summary.json`**: A JSON file that summarizes the time spent by each expert, calculated based on the number of messages they sent.
*   **`travel_log.json`**: A JSON file that logs all travel events, including the start_date, end_date, destination, and duration of the travel.
*   **`test_report_*.json`**: JSON files containing the results of the diagnostic tests generated during the simulation.
*   **`expert_recommendations.json`**: A JSON file logging the recommendations made by the experts.
*   **`health_profile.json`**: A JSON file representing the user's health profile, which is updated with recommendations from the experts.
*   **`notepad.json`**: A JSON file containing a list of medicines, treatments, and tests extracted from the expert's replies.


## Prerequisites

**NOTE**: The simulation requires an API Key from together.ai to access the models, also it would take a lot of time to run since it has to simulation 8 months of conversation which contains thousands of messages.

Before running the simulation, ensure you have the following prerequisites installed:

*   **Python 3**: The simulation is written in Python and requires a Python 3 interpreter.
*   **Required Python packages**: The necessary Python packages are listed in `requirements.txt`.

```bash
cd ai_engine
```

### Virtual Environment (Recommended)

It is highly recommended to use a virtual environment to install the dependencies. This will prevent conflicts with other projects or your system's Python installation.

To create and activate a virtual environment, run the following commands:

```bash
# Create a virtual environment named 'my_env'
python3 -m venv my_env

# Activate the virtual environment
source my_env/bin/activate
```

Once the virtual environment is activated, you can install the required packages:

```bash
pip install -r requirements.txt
```

### Global Installation (Not Recommended)

If you choose not to use a virtual environment, you can install the packages globally. However, this may lead to dependency conflicts.

```bash
pip install -r requirements.txt
```

Key dependencies include:
*   `together`
*   `requests`
*   `PyYAML`

## Running the Simulation

To run the simulation, execute the `main.py` script from the root directory of the project:

```bash
python3 main.py
```

The simulation will start and print output to the console, indicating the day being simulated and the events being processed.

Here is how to run the web application locally on your device.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
