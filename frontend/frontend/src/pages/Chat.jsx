import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../App.css"

function Chat({ setChatHistory }) {
  const [localChat, setLocalChat] = useState([]); // local state for current chat session
  const [question, setQuestion] = useState("");
  const [generating, setGenerating] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = { type: "question", content: question };
    setLocalChat(prev => [...prev, userMsg]);
    setQuestion("");
    setGenerating(true);

    try {
      // Save question to DB
      await axios.post("http://localhost:5000/api/chats", userMsg);

      // Send to Gemini
      const apiKey = import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT;
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: question }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiText = response.data.candidates[0].content.parts[0].text;
      const aiMsg = { type: "answer", content: aiText };

      // Add AI answer to local chat
      setLocalChat(prev => [...prev, aiMsg]);

      // Save answer to DB
      await axios.post("http://localhost:5000/api/chats", aiMsg);

      // Optionally update parent history immediately (if you want live update in history page)
      setChatHistory(prev => [...prev, userMsg, aiMsg]);

    } catch (err) {
      console.error("Error:", err);
      const errorMsg = { type: "answer", content: "⚠️ Sorry, something went wrong!" };
      setLocalChat(prev => [...prev, errorMsg]);
      await axios.post("http://localhost:5000/api/chats", errorMsg);
      setChatHistory(prev => [...prev, userMsg, errorMsg]);
    }

    setGenerating(false);
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col p-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold text-blue-600">New Chat 📝</h1>
      </header>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {localChat.map((chat, idx) => (
          <div key={idx} className={`flex ${chat.type === "question" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 max-w-[70%] rounded-lg text-sm shadow
              ${chat.type === "question" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
              <ReactMarkdown>{chat.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {generating && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-lg animate-pulse">Thinking...</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <textarea
          rows="2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 border rounded p-2 focus:outline-none focus:border-blue-400"
        />
        <button type="submit" disabled={generating}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
