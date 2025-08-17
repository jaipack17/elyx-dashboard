from events import Event
from vector_db import VectorDB
from history import ConversationHistory
from together import Together

def generate_communication(event: Event, vector_db: VectorDB, conversation_history: ConversationHistory):
    """Generates a communication based on an event and context from the vector database and conversation history."""
    print(f"--- generate_communication received event: {event.description} ---")

    client = Together()

    # Search for similar conversations in the vector database
    context = vector_db.search(event.description)
    print(f"--- generate_communication received context: {context} ---")

    # Get the last 10 messages from the conversation history
    history = conversation_history.get_history()
    print(f"--- generate_communication received history: {history} ---")

    # Crate a prompt with the event description, the retrieved context, and the conversation history
    prompt = f"""
    Generate a realistic WhatsApp-style conversation between the member (Rohan Patel) and the Elyx team, focusing on health and wellness topics. The conversation should be concise (2-3 messages total) and directly address the event, incorporating relevant details from the provided context and recent history. Avoid marketing or unrelated business topics.

    Event: {event.description}

    Context from previous conversations:
    {context}

    Recent conversation history:
    {history}

    Conversation:
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

def get_context_summary(vector_db: VectorDB):
    """Gets a summary of the context from the vector database."""
    client = Together()
    context = vector_db.search("recent health discussions")
    prompt = f"""
    Based on the following context from a user's health journey, provide a concise one-sentence summary.

    Context:
    {context}

    Summary:
    """
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

def generate_context_query(conversation_history: ConversationHistory):
    client = Together()

    # Search for similar conversations in the vector database

    # Get the last 10 messages from the conversation history
    history = conversation_history.get_history()
    string_search = ""
    for h in history:
        string_search += f"{h}\n"



    # Create a prompt with the event description, the retrieved context, and the conversation history
    prompt = f"""
    We have a vector database containing all the relevant information about the user's health and wellness journey. This includes previous conversations, context, and any other pertinent data. Generate a query which can be sent to the vector database, to fetch all the relevant information given the recent conversation history
    Recent Conversation History: {string_search}
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
