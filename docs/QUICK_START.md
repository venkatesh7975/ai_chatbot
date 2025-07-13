# Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you get the AI Chat Application running on your local machine quickly.

## Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local or Atlas) - [Download here](https://www.mongodb.com/try/download/community)
- **API Keys** - OpenRouter and/or Google Gemini

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd aichat

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure Environment

### Backend Configuration

Create `.env` file in `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/aichat
PORT=5000
```

### Frontend Configuration

Create `.env` file in `frontend/` directory:

```env
VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_gemini_api_key
```

## Step 3: Get API Keys

### Option 1: Google Gemini (Recommended for Quick Start)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to frontend `.env` file

### Option 2: OpenRouter

1. Sign up at [OpenRouter](https://openrouter.ai)
2. Get your API key
3. Update `backend/server.js` with your key

## Step 4: Start the Application

### Terminal 1 - Backend
```bash
cd backend
node index.js
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
```

## Step 5: Test the Application

1. Open your browser to `http://localhost:5173`
2. Type a message in the chat input
3. Press "Send" to test AI response
4. Navigate to "History" to see saved conversations

## 🎉 You're Done!

Your AI Chat Application is now running locally. You can:

- **Chat with AI**: Send messages and get responses
- **View History**: See all your conversations
- **Delete Messages**: Remove individual or all chats
- **Markdown Support**: AI responses support rich text

## Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (macOS)
brew services start mongodb-community

# Start MongoDB (Ubuntu)
sudo systemctl start mongod
```

**Frontend won't start:**
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**API errors:**
- Verify API keys are correct
- Check API quotas and limits
- Ensure environment variables are set

**CORS errors:**
- Backend should be running on port 5000
- Frontend should be running on port 5173
- Check browser console for specific errors

## Next Steps

### Development

1. **Modify the UI**: Edit `frontend/src/pages/Chat.jsx`
2. **Add new features**: Extend the API in `backend/routes/chatRoutes.js`
3. **Change AI model**: Update API configuration

### Deployment

1. **Deploy to Vercel**: Frontend deployment guide
2. **Deploy to Railway**: Backend deployment guide
3. **Set up MongoDB Atlas**: Cloud database setup

### Advanced Features

1. **Authentication**: Add user login system
2. **Real-time**: Implement WebSocket connections
3. **File uploads**: Add image/document support
4. **Voice chat**: Integrate speech recognition

## Project Structure

```
aichat/
├── backend/                 # Node.js server
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── index.js            # Main server
│   └── server.js           # Alternative server
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/          # React components
│   │   └── App.jsx         # Main app
│   └── package.json
└── docs/                   # Documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | Get all chats |
| POST | `/api/chats` | Save new chat |
| DELETE | `/api/chats/:id` | Delete specific chat |
| DELETE | `/api/chats` | Delete all chats |

## Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/aichat
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_gemini_api_key
VITE_API_URL=http://localhost:5000
```

## Development Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
node index.js        # Start development server
node server.js       # Start alternative server

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Database Schema

```javascript
{
  type: String,        // "question" or "answer"
  content: String,     // Message content
  createdAt: Date      // Timestamp
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- **Documentation**: Check the `docs/` folder
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions

## License

This project is licensed under the ISC License.

---

**Happy coding! 🤖💬** 