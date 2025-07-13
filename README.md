# AI Chat Application

A modern, full-stack AI chat application built with React, Node.js, and MongoDB. This application allows users to have conversations with AI models through a clean, responsive interface.

## 🚀 Features

- **Real-time AI Chat**: Interact with AI models (OpenRouter/GPT-4 and Google Gemini)
- **Chat History**: Persistent storage of all conversations
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Markdown Support**: AI responses support markdown formatting
- **History Management**: View, search, and delete chat history
- **Real-time Updates**: Live chat interface with typing indicators

## 🏗️ Architecture

### Frontend
- **React 19** with Vite for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Markdown** for rendering AI responses

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **Environment variables** for configuration

### AI Integration
- **OpenRouter API** (GPT-4o model)
- **Google Gemini API** (Gemini 2.0 Flash model)
- **Fallback handling** for API errors

## 📁 Project Structure

```
aichat/
├── backend/
│   ├── models/
│   │   └── Chat.js          # MongoDB schema
│   ├── routes/
│   │   └── chatRoutes.js    # API endpoints
│   ├── index.js             # Main server (MongoDB version)
│   ├── server.js            # Alternative server (OpenRouter)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Chat.jsx     # Main chat interface
│   │   │   └── History.jsx  # Chat history page
│   │   ├── App.jsx          # Main app component
│   │   └── App.css          # Global styles
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- API keys for AI services

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file
   MONGO_URI=mongodb://localhost:27017/aichat
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   # For MongoDB version
   node index.js
   
   # For OpenRouter version
   node server.js
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file
   VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_gemini_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/aichat
PORT=5000
```

#### Frontend (.env)
```env
VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_gemini_api_key
```

### API Keys Setup

1. **OpenRouter API** (for GPT-4o):
   - Sign up at [OpenRouter](https://openrouter.ai)
   - Get your API key
   - Update `server.js` with your key

2. **Google Gemini API**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Add to frontend `.env` file

## 📡 API Endpoints

### Chat Routes (`/api/chats`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | Get all chat history |
| POST | `/api/chats` | Save new chat message |
| DELETE | `/api/chats/:id` | Delete specific chat |
| DELETE | `/api/chats` | Delete all chats |

### Chat Endpoint (`/chat`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Send message to AI and get response |

## 🎨 UI Components

### Chat Interface
- **Message Display**: User messages (blue) and AI responses (gray)
- **Markdown Rendering**: AI responses support markdown formatting
- **Typing Indicator**: Shows when AI is generating response
- **Input Form**: Textarea with send button

### History Page
- **Chat List**: Chronological display of all conversations
- **Delete Options**: Individual and bulk delete functionality
- **Type Indicators**: Visual distinction between questions and answers

## 🔄 Data Flow

1. **User sends message** → Frontend validates input
2. **Save to database** → Question stored in MongoDB
3. **AI API call** → Send to Gemini/OpenRouter API
4. **Process response** → Format and display AI reply
5. **Save response** → Answer stored in database
6. **Update UI** → Real-time chat interface updates

## 🗄️ Database Schema

### Chat Model
```javascript
{
  type: String,        // "question" or "answer"
  content: String,     // Message content
  createdAt: Date      // Timestamp (auto-generated)
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platform (Vercel, Netlify, etc.)
3. Configure environment variables

## 🔒 Security Considerations

- **API Key Protection**: Store keys in environment variables
- **Input Validation**: Sanitize user inputs
- **CORS Configuration**: Properly configured for production
- **Error Handling**: Graceful error responses

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MONGO_URI in .env
   - Ensure MongoDB is running

2. **API Key Errors**
   - Verify API keys are correct
   - Check API quotas and limits

3. **CORS Errors**
   - Ensure backend CORS is properly configured
   - Check frontend URL matches backend CORS settings

## 📝 Development Notes

### Code Quality
- ESLint configured for React
- Consistent code formatting
- Error boundaries and loading states

### Performance
- Efficient state management
- Optimized re-renders
- Database indexing for queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- OpenRouter for AI API access
- Google Gemini for alternative AI model
- React and Vite for frontend framework
- Tailwind CSS for styling
- MongoDB for database 