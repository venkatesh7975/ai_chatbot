# Backend Documentation

## Overview

The backend is built with Node.js and Express.js, providing RESTful API endpoints for chat management and AI integration. The application uses MongoDB for data persistence and supports multiple AI service providers.

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Document Mapper)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
backend/
├── models/
│   └── Chat.js              # MongoDB schema
├── routes/
│   └── chatRoutes.js        # API route handlers
├── index.js                 # Main server (MongoDB version)
├── server.js                # Alternative server (OpenRouter)
├── package.json
└── .env                     # Environment variables
```

## Server Architecture

### Main Server (index.js)

**Purpose**: MongoDB-based server with full chat history management.

**Features**:
- MongoDB connection
- CORS configuration
- Route middleware
- Environment variable support

**Key Components**:
```javascript
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
```

### Alternative Server (server.js)

**Purpose**: OpenRouter-based server for direct AI integration.

**Features**:
- Direct OpenRouter API integration
- Static file serving
- Simplified architecture

**Key Components**:
```javascript
const express = require("express");
const axios = require("axios");
const path = require("path");
```

## Database Models

### Chat Model

**Location**: `models/Chat.js`

**Schema**:
```javascript
const chatSchema = new mongoose.Schema({
  type: String,                    // "question" or "answer"
  content: String,                 // Message content
  createdAt: { type: Date, default: Date.now }
});
```

**Fields**:
- `type` - Message type (question/answer)
- `content` - Message text content
- `createdAt` - Timestamp (auto-generated)

**Indexes**:
- `createdAt` - For chronological sorting
- `type` - For filtering by message type

## API Routes

### Chat Routes (`/api/chats`)

**Location**: `routes/chatRoutes.js`

#### GET `/api/chats`

**Purpose**: Retrieve all chat messages.

**Response**:
```javascript
// Success (200)
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "type": "question",
    "content": "What is React?",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]

// Error (500)
{ "message": "Error fetching chats" }
```

**Implementation**:
```javascript
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chats" });
  }
});
```

#### POST `/api/chats`

**Purpose**: Save a new chat message.

**Request Body**:
```javascript
{
  "type": "question|answer",
  "content": "Message content"
}
```

**Response**:
```javascript
// Success (201)
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "type": "question",
  "content": "What is React?",
  "createdAt": "2024-01-15T10:30:00.000Z"
}

// Error (500)
{ "message": "Error saving chat" }
```

**Implementation**:
```javascript
router.post("/", async (req, res) => {
  const { type, content } = req.body;
  try {
    const newChat = new Chat({ type, content });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Error saving chat" });
  }
});
```

#### DELETE `/api/chats/:id`

**Purpose**: Delete a specific chat message.

**Parameters**:
- `id` - MongoDB ObjectId

**Response**:
```javascript
// Success (200)
{ "message": "Chat deleted" }

// Error (500)
{ "message": "Error message" }
```

**Implementation**:
```javascript
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

#### DELETE `/api/chats`

**Purpose**: Delete all chat messages.

**Response**:
```javascript
// Success (200)
{ "message": "All chats deleted" }

// Error (500)
{ "message": "Error message" }
```

**Implementation**:
```javascript
router.delete("/", async (req, res) => {
  try {
    await Chat.deleteMany();
    res.json({ message: "All chats deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

## AI Integration

### OpenRouter Integration (server.js)

**Configuration**:
```javascript
const API_KEY = "your-openrouter-api-key";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o";
```

**Chat Endpoint**:
```javascript
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          { role: "user", content: userMessage }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "Venkatesh Chatbot",
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error("OpenRouter error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from OpenRouter" });
  }
});
```

### Google Gemini Integration (Frontend)

**Frontend Implementation**:
```javascript
const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  { contents: [{ parts: [{ text: question }] }] },
  { headers: { "Content-Type": "application/json" } }
);
```

## Middleware Configuration

### CORS Setup

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

### Body Parser

```javascript
app.use(express.json());
```

### Environment Variables

```javascript
import dotenv from "dotenv";
dotenv.config();
```

## Database Connection

### MongoDB Connection

```javascript
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
```

### Connection Options

```javascript
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

## Error Handling

### Global Error Handler

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});
```

### Route-Level Error Handling

```javascript
try {
  // Route logic
} catch (err) {
  console.error("Error:", err);
  res.status(500).json({ message: "Error message" });
}
```

## Security Considerations

### Input Validation

```javascript
// Validate required fields
if (!type || !content) {
  return res.status(400).json({ message: "Type and content are required" });
}

// Sanitize input
const sanitizedContent = content.trim();
if (sanitizedContent.length === 0) {
  return res.status(400).json({ message: "Content cannot be empty" });
}
```

### API Key Protection

```javascript
// Store in environment variables
const API_KEY = process.env.OPENROUTER_API_KEY;

// Validate API key
if (!API_KEY) {
  console.error("❌ OpenRouter API key not found");
  process.exit(1);
}
```

### CORS Configuration

```javascript
// Development
app.use(cors());

// Production
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Performance Optimizations

### Database Optimizations

1. **Indexing**:
   ```javascript
   // Add indexes for frequently queried fields
   chatSchema.index({ createdAt: 1 });
   chatSchema.index({ type: 1 });
   ```

2. **Query Optimization**:
   ```javascript
   // Use projection to limit returned fields
   const chats = await Chat.find({}, 'type content createdAt')
     .sort({ createdAt: 1 })
     .limit(100);
   ```

### Response Optimization

1. **Compression**:
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Caching**:
   ```javascript
   // Add cache headers
   res.set('Cache-Control', 'public, max-age=300');
   ```

## Monitoring and Logging

### Request Logging

```javascript
import morgan from 'morgan';

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Production logging
app.use(morgan('combined'));
```

### Error Logging

```javascript
// Log errors with context
console.error('Database error:', {
  error: err.message,
  stack: err.stack,
  timestamp: new Date().toISOString(),
  route: req.path,
  method: req.method
});
```

### Health Check Endpoint

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
```

## Testing

### Unit Testing

```javascript
// Example test with Jest and Supertest
import request from 'supertest';
import app from '../index.js';

describe('Chat API', () => {
  test('GET /api/chats returns chat list', async () => {
    const response = await request(app)
      .get('/api/chats')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/chats creates new chat', async () => {
    const newChat = {
      type: 'question',
      content: 'Test message'
    };

    const response = await request(app)
      .post('/api/chats')
      .send(newChat)
      .expect(201);

    expect(response.body.content).toBe(newChat.content);
  });
});
```

### Integration Testing

```javascript
// Test database operations
describe('Database Operations', () => {
  beforeEach(async () => {
    await Chat.deleteMany({});
  });

  test('saves and retrieves chat messages', async () => {
    const chat = new Chat({
      type: 'question',
      content: 'Test question'
    });
    
    await chat.save();
    
    const savedChat = await Chat.findById(chat._id);
    expect(savedChat.content).toBe('Test question');
  });
});
```

## Deployment

### Environment Configuration

```javascript
// Production environment
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aichat';
const NODE_ENV = process.env.NODE_ENV || 'development';
```

### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'aichat-backend',
    script: 'index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

## Future Enhancements

### Planned Features

1. **Authentication**:
   - JWT token implementation
   - User registration/login
   - Role-based access control

2. **Real-time Features**:
   - WebSocket integration
   - Live typing indicators
   - Real-time notifications

3. **Advanced AI Features**:
   - Multiple AI model support
   - Conversation context management
   - AI model switching

4. **Performance Improvements**:
   - Redis caching
   - Database connection pooling
   - API rate limiting

### Code Improvements

1. **Architecture**:
   - Service layer implementation
   - Repository pattern
   - Dependency injection

2. **Testing**:
   - Comprehensive test coverage
   - API contract testing
   - Performance testing

3. **Monitoring**:
   - Application performance monitoring
   - Error tracking
   - Usage analytics 