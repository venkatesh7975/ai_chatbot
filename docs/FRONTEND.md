# Frontend Documentation

## Overview

The frontend is built with React 19 and Vite, providing a modern, responsive chat interface. The application uses Tailwind CSS for styling and includes features like real-time chat, markdown rendering, and chat history management.

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Chat.jsx          # Main chat interface
│   │   └── History.jsx       # Chat history page
│   ├── App.jsx               # Main app component
│   ├── App.css               # Global styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Base styles
├── public/
│   └── vite.svg              # Vite logo
├── package.json
└── vite.config.js
```

## Components

### App.jsx

**Purpose**: Main application component with routing and global state.

**Features**:
- React Router setup
- Global chat history state
- Navigation header
- Responsive layout

**Key Props**:
- `chatHistory` - Global chat state
- `setChatHistory` - Function to update chat history

**State Management**:
```javascript
const [chatHistory, setChatHistory] = useState([]);
```

### Chat.jsx

**Purpose**: Main chat interface for user-AI conversations.

**Features**:
- Real-time message display
- Markdown rendering for AI responses
- Typing indicators
- Form validation
- Error handling

**Key Functions**:
- `handleSend()` - Process user messages and AI responses
- `setLocalChat()` - Update local chat state
- `setGenerating()` - Control loading states

**State Variables**:
```javascript
const [localChat, setLocalChat] = useState([]);
const [question, setQuestion] = useState("");
const [generating, setGenerating] = useState(false);
```

**API Integration**:
- Saves messages to backend database
- Calls Google Gemini API for AI responses
- Handles errors gracefully

### History.jsx

**Purpose**: Display and manage chat history.

**Features**:
- Load all chat history from database
- Individual message deletion
- Bulk deletion (clear all)
- Visual distinction between questions and answers

**Key Functions**:
- `fetchHistory()` - Load chat history from API
- `handleDeleteChat()` - Delete individual messages
- `handleClearAll()` - Delete all messages

**State Variables**:
```javascript
const [chatHistory, setChatHistory] = useState([]);
```

## Styling

### Tailwind CSS Classes

**Layout**:
- `min-h-screen` - Full viewport height
- `max-w-4xl` - Maximum width container
- `flex flex-col` - Vertical flexbox layout

**Colors**:
- `bg-blue-500` - Primary blue background
- `text-white` - White text
- `bg-gray-200` - Light gray background
- `text-gray-800` - Dark gray text

**Spacing**:
- `p-4` - Padding
- `m-4` - Margin
- `space-y-2` - Vertical spacing between elements

**Responsive Design**:
- Mobile-first approach
- Responsive breakpoints
- Flexible layouts

### Custom CSS (App.css)

**Global Styles**:
```css
body, html, #root {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4f8;
  min-height: 100vh;
}
```

**Message Styling**:
```css
.message.question {
  background: #3b82f6;
  color: white;
  align-self: flex-end;
}

.message.answer {
  background: #e2e8f0;
  color: #111827;
  align-self: flex-start;
}
```

## State Management

### Local State

Each component manages its own local state:

**Chat Component**:
- `localChat` - Current session messages
- `question` - Current input value
- `generating` - Loading state

**History Component**:
- `chatHistory` - All chat messages from database

### Global State

**App Component**:
- `chatHistory` - Shared across components
- Updated when new messages are sent

## API Integration

### Backend Communication

**Base URL**: `http://localhost:5000`

**Endpoints Used**:
- `GET /api/chats` - Fetch chat history
- `POST /api/chats` - Save new messages
- `DELETE /api/chats/:id` - Delete specific message
- `DELETE /api/chats` - Delete all messages

### AI Service Integration

**Google Gemini API**:
```javascript
const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  { contents: [{ parts: [{ text: question }] }] }
);
```

## User Experience

### Chat Interface

1. **Message Input**:
   - Textarea for user input
   - Form validation (non-empty messages)
   - Send button with loading state

2. **Message Display**:
   - User messages (blue, right-aligned)
   - AI responses (gray, left-aligned)
   - Markdown rendering for rich text
   - Timestamp information

3. **Loading States**:
   - Typing indicator during AI response
   - Disabled send button while processing
   - Error messages for failed requests

### Navigation

1. **Header Navigation**:
   - Chat page link
   - History page link
   - Responsive design

2. **Page Routing**:
   - React Router for SPA navigation
   - URL-based navigation
   - Browser back/forward support

## Error Handling

### Network Errors

```javascript
try {
  const response = await axios.post('/api/chats', userMsg);
} catch (err) {
  console.error("Error:", err);
  const errorMsg = { type: "answer", content: "⚠️ Sorry, something went wrong!" };
  setLocalChat(prev => [...prev, errorMsg]);
}
```

### Validation Errors

```javascript
if (!question.trim()) return; // Prevent empty messages
```

### User Feedback

- Error messages displayed in chat
- Loading indicators
- Disabled states for buttons

## Performance Optimizations

### React Optimizations

1. **State Updates**:
   - Efficient state updates with spread operator
   - Minimal re-renders

2. **Component Structure**:
   - Logical component separation
   - Props drilling minimized

3. **Event Handling**:
   - Debounced input handling
   - Proper event cleanup

### Bundle Optimization

1. **Vite Configuration**:
   - Fast HMR (Hot Module Replacement)
   - Optimized builds
   - Tree shaking

2. **Dependencies**:
   - Minimal dependencies
   - Optimized imports

## Accessibility

### ARIA Labels

```jsx
<button 
  type="submit" 
  disabled={generating}
  aria-label="Send message"
  className="px-4 py-2 bg-blue-500 text-white rounded"
>
  Send
</button>
```

### Keyboard Navigation

- Tab navigation support
- Enter key for form submission
- Escape key for canceling actions

### Screen Reader Support

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images

## Testing

### Manual Testing

1. **Chat Functionality**:
   - Send messages
   - Receive AI responses
   - Markdown rendering
   - Error handling

2. **History Management**:
   - Load chat history
   - Delete individual messages
   - Clear all messages

3. **Responsive Design**:
   - Mobile view
   - Tablet view
   - Desktop view

### Automated Testing

**Recommended Testing Stack**:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing

**Test Examples**:
```javascript
// Component test
test('renders chat interface', () => {
  render(<Chat />);
  expect(screen.getByPlaceholderText('Ask anything...')).toBeInTheDocument();
});

// API test
test('sends message to AI', async () => {
  const mockResponse = { data: { reply: 'AI response' } };
  axios.post.mockResolvedValue(mockResponse);
  
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Hello AI' }
  });
  fireEvent.click(screen.getByText('Send'));
  
  await waitFor(() => {
    expect(screen.getByText('AI response')).toBeInTheDocument();
  });
});
```

## Deployment

### Build Process

```bash
npm run build
```

### Environment Variables

```env
VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_gemini_api_key
```

### Deployment Platforms

1. **Vercel**:
   - Connect GitHub repository
   - Automatic deployments
   - Environment variable configuration

2. **Netlify**:
   - Drag and drop deployment
   - Custom domain support
   - Form handling

3. **GitHub Pages**:
   - Static site hosting
   - Free tier available

## Future Enhancements

### Planned Features

1. **Real-time Updates**:
   - WebSocket integration
   - Live typing indicators
   - Real-time notifications

2. **Advanced UI**:
   - Dark mode toggle
   - Custom themes
   - Animation improvements

3. **Enhanced Chat**:
   - File uploads
   - Voice messages
   - Chat search functionality

4. **User Management**:
   - User authentication
   - User profiles
   - Chat sharing

### Code Improvements

1. **State Management**:
   - Redux or Zustand for global state
   - Better state persistence

2. **Performance**:
   - Virtual scrolling for large chat histories
   - Lazy loading for components
   - Service worker for offline support

3. **Testing**:
   - Comprehensive test coverage
   - E2E testing
   - Performance testing 