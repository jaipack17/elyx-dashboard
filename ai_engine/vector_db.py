
import chromadb
from sentence_transformers import SentenceTransformer

class VectorDB:
    """A wrapper for a ChromaDB vector database."""

    def __init__(self, path="chroma_db"):
        self.client = chromadb.PersistentClient(path=path)
        # Clear the collection on each run for development purposes
        try:
            self.client.delete_collection("elyx_conversations")
        except:
            pass # Collection might not exist yet
        self.collection = self.client.get_or_create_collection("elyx_conversations")
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def add_message(self, message, metadata={}):
        """Adds a message to the vector database."""
        print(f"--- Adding message to vector db: {message} ---")
        embedding = self.model.encode(message).tolist()
        self.collection.add(
            embeddings=[embedding],
            documents=[message],
            metadatas=[metadata],
            ids=[str(self.collection.count() + 1)]
        )

    def search(self, query, n_results=1):
        """Searches for similar messages in the vector database."""
        print(f"--- Searching vector db for: {query} ---")
        embedding = self.model.encode(query).tolist()
        results = self.collection.query(
            query_embeddings=[embedding],
            n_results=n_results
        )
        print(f"--- Found results: {results} ---")
        return results
