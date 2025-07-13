import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function History() {
  const [chatHistory, setChatHistory] = useState([]);

  // Load chats when mounted
  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await axios.get("http://localhost:5000/api/chats");
      setChatHistory(res.data);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  }

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
        <h2 className="text-2xl font-semibold text-blue-600">Chat History 📜</h2>
        {chatHistory.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {chatHistory.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          chatHistory.map((chat) => (
            <div
              key={chat._id}
              className={`relative p-3 rounded shadow hover:shadow-md transition 
                ${chat.type === "question" ? "bg-blue-50" : "bg-gray-100"}`}
            >
              <span className="text-xs text-gray-500 capitalize">{chat.type}</span>
              <p className="text-sm mt-1">{chat.content}</p>
              
              {/* Delete button */}
              <button
                onClick={() => handleDeleteChat(chat._id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xs"
                title="Delete"
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
