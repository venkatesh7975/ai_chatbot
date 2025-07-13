# API Documentation

## Overview

The AI Chat Application provides RESTful API endpoints for managing chat conversations and interacting with AI models. The API is built with Express.js and uses MongoDB for data persistence.

## Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://your-domain.com`

## Authentication

Currently, the API doesn't require authentication. All endpoints are publicly accessible.

## Endpoints

### 1. Chat History Management

#### GET `/api/chats`

Retrieve all chat messages from the database.

**Response:**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "type": "question",
    "content": "What is React?",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "type": "answer",
    "content": "React is a JavaScript library for building user interfaces...",
    "createdAt": "2024-01-15T10:30:05.000Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

#### POST `/api/chats`

Save a new chat message to the database.

**Request Body:**
```json
{
  "type": "question|answer",
  "content": "Message content"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
  "type": "question",
  "content": "What is React?",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Invalid request body
- `500` - Server error

---

#### DELETE `/api/chats/:id`

Delete a specific chat message by ID.

**Parameters:**
- `id` (string) - The chat message ID

**Response:**
```json
{
  "message": "Chat deleted"
}
```

**Status Codes:**
- `200` - Deleted successfully
- `404` - Chat not found
- `500` - Server error

---

#### DELETE `/api/chats`

Delete all chat messages from the database.

**Response:**
```json
{
  "message": "All chats deleted"
}
```

**Status Codes:**
- `200` - Deleted successfully
- `500` - Server error

### 2. AI Chat Integration

#### POST `/chat`

Send a message to the AI model and get a response.

**Request Body:**
```json
{
  "message": "What is the capital of France?"
}
```

**Response:**
```json
{
  "reply": "The capital of France is Paris. It's a beautiful city known for its rich history, culture, and iconic landmarks like the Eiffel Tower."
}
```

**Status Codes:**
- `200` - Success
- `400` - Empty message
- `500` - AI service error

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message description"
}
```

### Common Error Messages

- `"Message cannot be empty"` - When sending empty messages
- `"Failed to get response from OpenRouter"` - AI service unavailable
- `"Error fetching chats"` - Database query failed
- `"Error saving chat"` - Database save operation failed

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (development)
- `http://localhost:5173` (Vite dev server)

For production, update CORS settings in `backend/index.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

## Data Models

### Chat Schema

```javascript
{
  type: String,        // "question" or "answer"
  content: String,     // Message content
  createdAt: Date      // Auto-generated timestamp
}
```

## Usage Examples

### JavaScript (Frontend)

```javascript
// Get all chats
const response = await fetch('http://localhost:5000/api/chats');
const chats = await response.json();

// Save a new chat
const newChat = await fetch('http://localhost:5000/api/chats', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'question',
    content: 'Hello, AI!'
  })
});

// Send message to AI
const aiResponse = await fetch('http://localhost:5000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'What is machine learning?'
  })
});
```

### cURL Examples

```bash
# Get all chats
curl -X GET http://localhost:5000/api/chats

# Save a new chat
curl -X POST http://localhost:5000/api/chats \
  -H "Content-Type: application/json" \
  -d '{"type": "question", "content": "Hello!"}'

# Send message to AI
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is AI?"}'

# Delete specific chat
curl -X DELETE http://localhost:5000/api/chats/64f8a1b2c3d4e5f6a7b8c9d0

# Delete all chats
curl -X DELETE http://localhost:5000/api/chats
```

## Testing

### Manual Testing

1. Start the backend server
2. Use Postman or similar tool to test endpoints
3. Verify responses match expected formats

### Automated Testing

Consider implementing tests using:
- Jest for unit testing
- Supertest for API testing
- MongoDB Memory Server for database testing

## Monitoring

### Logs

The server logs important events:
- Server startup
- MongoDB connection status
- API errors
- AI service errors

### Health Check

Consider adding a health check endpoint:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
```

## Security Considerations

1. **Input Validation**: All inputs should be validated and sanitized
2. **API Key Protection**: Store API keys in environment variables
3. **Error Handling**: Don't expose sensitive information in error messages
4. **CORS**: Configure CORS properly for production
5. **Rate Limiting**: Implement rate limiting for production use 