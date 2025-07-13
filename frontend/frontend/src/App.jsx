import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Chat from "./pages/Chat";
import History from "./pages/History";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
        {/* Header / Navbar */}
        <header className="bg-white shadow-md py-3">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Chat AI 🤖</h1>
            <nav className="space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-blue-500 transition"
              >
                Chat
              </Link>
              <Link 
                to="/history" 
                className="text-gray-600 hover:text-blue-500 transition"
              >
                History
              </Link>
            </nav>
          </div>
        </header>

        {/* Pages */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route 
              path="/" 
              element={<Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />} 
            />
            <Route 
              path="/history" 
              element={<History chatHistory={chatHistory} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
