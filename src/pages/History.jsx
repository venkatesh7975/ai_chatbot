import { useEffect, useCallback } from "react";
import axios from "axios";
import "../App.css";

function History({ chatHistory, setChatHistory }) {
  // Load chats when mounted
  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chats");
      setChatHistory(res.data);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  }, [setChatHistory]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Delete a single chat by ID
  async function handleDeleteChat(id) {
    try {
      await axios.delete(`http://localhost:5000/api/chats/${id}`);
      setChatHistory(prev => prev.filter(chat => chat._id !== id));
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  }

  // Clear all chats
  async function handleClearAll() {
    try {
      await axios.delete(`http://localhost:5000/api/chats`);
      setChatHistory([]);
    } catch (err) {
      console.error("Failed to clear chats:", err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-blue-600">Chat History 📜</h2>
          <p className="text-sm text-gray-500 mt-1">
            {chatHistory.length} message{chatHistory.length !== 1 ? 's' : ''} in history
          </p>
        </div>
        {chatHistory.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-red-500 hover:text-red-700 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50 transition"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No history yet.</p>
            <p className="text-gray-400 text-sm mt-2">Start a conversation to see your chat history here.</p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <div
              key={chat._id}
              className={`relative p-3 rounded shadow hover:shadow-md transition 
                ${chat.type === "question" ? "bg-blue-50 border-l-4 border-blue-400" : "bg-gray-100 border-l-4 border-gray-400"}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-xs text-gray-500 capitalize font-medium">
                    {chat.type === "question" ? "👤 You" : "🤖 AI"}
                  </span>
                  <p className="text-sm mt-1 break-words">{chat.content}</p>
                  <span className="text-xs text-gray-400 mt-2 block">
                    {new Date(chat.createdAt).toLocaleString()}
                  </span>
                </div>
                
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteChat(chat._id)}
                  className="ml-2 text-gray-400 hover:text-red-500 text-xs p-1 hover:bg-red-50 rounded transition"
                  title="Delete message"
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
