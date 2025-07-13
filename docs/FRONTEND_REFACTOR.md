# Frontend Refactoring with useContext

## Overview

The frontend has been refactored to use React Context API for better state management, eliminating prop drilling and improving code organization.

## Changes Made

### 1. Context Implementation

#### ChatContext (`src/context/ChatContext.jsx`)

**Purpose**: Centralized state management for all chat-related operations.

**Key Features**:
- Global chat history state
- API operations (CRUD)
- AI integration
- Error handling
- Loading states

**State Management**:
```javascript
const [chatHistory, setChatHistory] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**API Operations**:
- `fetchChatHistory()` - Load all chats from database
- `addChatMessage()` - Save new message
- `deleteChatMessage()` - Delete specific message
- `clearAllChats()` - Delete all messages
- `sendMessageToAI()` - Get AI response

**Computed Values**:
- `totalChats` - Total message count
- `questions` - Filtered question messages
- `answers` - Filtered answer messages

### 2. Custom Hooks

#### useChatSession (`src/hooks/useChatSession.js`)

**Purpose**: Manage current chat session state separately from global history.

**Features**:
- Local chat session state
- Input management
- Loading states
- Session statistics

**State**:
```javascript
const [localChat, setLocalChat] = useState([]);
const [question, setQuestion] = useState("");
const [generating, setGenerating] = useState(false);
```

**Actions**:
- `addToSession()` - Add message to current session
- `clearSession()` - Clear current session
- `updateQuestion()` - Update input value
- `setGeneratingState()` - Control loading state

### 3. Component Refactoring

#### App.jsx

**Before**:
```javascript
const [chatHistory, setChatHistory] = useState([]);

<Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />
<History chatHistory={chatHistory} />
```

**After**:
```javascript
<ChatProvider>
  <Chat />
  <History />
</ChatProvider>
```

#### Chat.jsx

**Before**:
- Direct API calls with axios
- Props for state management
- Local state management

**After**:
- Uses `useChat()` context
- Uses `useChatSession()` hook
- Cleaner separation of concerns

**Key Improvements**:
- Error handling with context
- Session statistics display
- Better loading states
- Improved user feedback

#### History.jsx

**Before**:
- Local state management
- Direct API calls
- Manual data fetching

**After**:
- Uses `useChat()` context
- Automatic data loading
- Better error handling
- Enhanced UI with statistics

### 4. New Components

#### ChatStats (`src/components/ChatStats.jsx`)

**Purpose**: Display chat statistics and analytics.

**Features**:
- Total message count
- Question/answer breakdown
- Visual statistics display
- Loading state handling

## Benefits of Refactoring

### 1. **Eliminated Prop Drilling**
- No more passing state through multiple component levels
- Centralized state management
- Cleaner component interfaces

### 2. **Better Error Handling**
- Centralized error state
- Consistent error display across components
- Better user feedback

### 3. **Improved Performance**
- Reduced re-renders
- Optimized state updates
- Better memoization with useCallback

### 4. **Enhanced User Experience**
- Loading states for all operations
- Session statistics
- Better visual feedback
- Improved error messages

### 5. **Code Organization**
- Separation of concerns
- Reusable hooks
- Modular components
- Better maintainability

## File Structure

```
frontend/src/
├── context/
│   └── ChatContext.jsx          # Global state management
├── hooks/
│   └── useChatSession.js        # Session state management
├── components/
│   └── ChatStats.jsx            # Statistics component
├── pages/
│   ├── Chat.jsx                 # Refactored chat component
│   └── History.jsx              # Refactored history component
└── App.jsx                      # Updated with ChatProvider
```

## Usage Examples

### Using ChatContext

```javascript
import { useChat } from '../context/ChatContext';

function MyComponent() {
  const { 
    chatHistory, 
    loading, 
    error, 
    addChatMessage, 
    deleteChatMessage 
  } = useChat();

  // Use context methods
  const handleSend = async (message) => {
    await addChatMessage(message);
  };
}
```

### Using ChatSession Hook

```javascript
import { useChatSession } from '../hooks/useChatSession';

function ChatComponent() {
  const {
    localChat,
    question,
    generating,
    addToSession,
    updateQuestion,
    sessionStats
  } = useChatSession();

  // Manage session state
  const handleSend = () => {
    addToSession(userMessage);
    updateQuestion("");
  };
}
```

## State Flow

### 1. **Global State (ChatContext)**
```
User Action → Context Method → API Call → State Update → UI Update
```

### 2. **Session State (useChatSession)**
```
User Input → Session Hook → Local State → UI Update
```

### 3. **Data Flow**
```
Chat Component → useChatSession → ChatContext → API → Database
```

## Error Handling

### Context Level
- API errors are caught and stored in context
- Loading states are managed globally
- Error messages are displayed consistently

### Component Level
- Local errors are handled within components
- User feedback is immediate
- Graceful degradation

## Performance Optimizations

### 1. **useCallback Usage**
- Prevents unnecessary re-renders
- Optimizes function references
- Better memoization

### 2. **State Updates**
- Efficient state updates with spread operator
- Minimal re-renders
- Optimized context value

### 3. **Component Structure**
- Logical separation of concerns
- Reduced prop drilling
- Better component composition

## Testing Considerations

### Context Testing
```javascript
// Test context provider
const wrapper = ({ children }) => (
  <ChatProvider>{children}</ChatProvider>
);

// Test context values
const { result } = renderHook(() => useChat(), { wrapper });
```

### Hook Testing
```javascript
// Test custom hooks
const { result } = renderHook(() => useChatSession());
expect(result.current.sessionStats.totalMessages).toBe(0);
```

## Migration Guide

### From Props to Context

**Before**:
```javascript
function Chat({ chatHistory, setChatHistory }) {
  // Component logic
}
```

**After**:
```javascript
function Chat() {
  const { chatHistory, addChatMessage } = useChat();
  // Component logic
}
```

### From Local State to Context

**Before**:
```javascript
const [chatHistory, setChatHistory] = useState([]);
const fetchHistory = async () => {
  const response = await axios.get('/api/chats');
  setChatHistory(response.data);
};
```

**After**:
```javascript
const { chatHistory, fetchChatHistory } = useChat();
// fetchChatHistory is automatically called on mount
```

## Future Enhancements

### 1. **Real-time Updates**
- WebSocket integration with context
- Live chat updates
- Real-time notifications

### 2. **Advanced State Management**
- Redux integration if needed
- Persistence layer
- Offline support

### 3. **Performance Monitoring**
- Context performance metrics
- State update tracking
- Memory usage optimization

### 4. **Testing Improvements**
- Comprehensive context tests
- Hook testing utilities
- Integration tests

## Best Practices

### 1. **Context Usage**
- Keep context focused and specific
- Avoid over-engineering
- Use multiple contexts if needed

### 2. **Hook Organization**
- Separate concerns into different hooks
- Keep hooks simple and focused
- Document hook interfaces

### 3. **Component Structure**
- Use composition over inheritance
- Keep components small and focused
- Separate UI and logic concerns

### 4. **Error Handling**
- Handle errors at appropriate levels
- Provide meaningful error messages
- Implement graceful degradation

## Conclusion

The refactoring to useContext has significantly improved the codebase by:

- **Eliminating prop drilling**
- **Centralizing state management**
- **Improving error handling**
- **Enhancing user experience**
- **Better code organization**

The new architecture is more maintainable, scalable, and provides a better foundation for future enhancements. 