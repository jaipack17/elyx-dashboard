

class ConversationHistory:
    """A simple class to keep track of the last N messages."""

    def __init__(self, n=10):
        self.n = n
        self.history = []

    def add_message(self, message):
        """Adds a message to the history."""
        self.history.append(message)
        if len(self.history) > self.n:
            self.history.pop(0)

    def get_history(self):
        """Returns the last N messages."""
        return "\n".join(self.history)

