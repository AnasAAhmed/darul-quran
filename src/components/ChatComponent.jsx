import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

/**
 * Example Chat Component for Darul Quran
 * 
 * Features:
 * - Real-time messaging with Socket.io
 * - Online/offline status
 * - Message delivery status
 * - Typing indicators
 * 
 * Usage:
 * 1. Replace VITE_PUBLIC_SERVER_URL with your backend URL
 * 2. Ensure user is authenticated and has userId
 * 3. Import and use: <ChatComponent receiverId={someUserId} />
 */

const ChatComponent = ({ receiverId, currentUserId, authToken }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const typingTimeoutRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_PUBLIC_SERVER_URL);
    setSocket(newSocket);

    // Register user as online
    newSocket.emit('user-online', currentUserId);

    // Listen for online users updates
    newSocket.on('update-online-users', (users) => {
      setOnlineUsers(users);
      console.log('Online users:', users);
    });

    // Listen for incoming messages
    newSocket.on('receive-message', (data) => {
      console.log('New message received:', data);
      setMessages((prev) => [...prev, data.message]);
      
      // Mark message as read
      if (data.chatId) {
        markAsRead(data.chatId);
      }
    });

    // Listen for typing indicator
    newSocket.on('user-typing', ({ isTyping: typing, senderName }) => {
      setIsTyping(typing);
      if (typing) {
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId]);

  // Load chat messages on component mount
  useEffect(() => {
    loadChatMessages();
  }, [receiverId]);

  // Load existing messages
  const loadChatMessages = async () => {
    try {
      // First, get all chats to find the chatId
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/chat`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      // Find chat with this receiver
      const chat = data.chats?.find(
        (c) => c.otherUserId === receiverId
      );

      if (chat) {
        setChatId(chat.id);
        
        // Load messages for this chat
        const messagesResponse = await fetch(
          `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/chat/${chat.id}/messages`,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const messagesData = await messagesResponse.json();
        setMessages(messagesData.messages || []);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/chat/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: receiverId,
          message: newMessage,
          type: 'text',
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add message to local state
        setMessages((prev) => [...prev, data.data.message]);
        setNewMessage('');
        
        // Set chatId if it was just created
        if (data.data.chatId && !chatId) {
          setChatId(data.data.chatId);
        }

        // Stop typing indicator
        if (socket) {
          socket.emit('typing', {
            receiverId,
            isTyping: false,
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing event
    socket.emit('typing', {
      receiverId,
      isTyping: true,
      senderName: 'User', // Replace with actual user name
    });

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', {
        receiverId,
        isTyping: false,
      });
    }, 2000);
  };

  // Mark messages as read
  const markAsRead = async (chatIdToMark) => {
    try {
      await fetch(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/chat/${chatIdToMark}/read`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const isReceiverOnline = onlineUsers.includes(receiverId);

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="receiver-info">
          <h3>Chat with User {receiverId}</h3>
          <span className={`status ${isReceiverOnline ? 'online' : 'offline'}`}>
            {isReceiverOnline ? '🟢 Online' : '⚫ Offline'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.userId === currentUserId ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{msg.text}</p>
              <span className="message-time">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
              {msg.userId === currentUserId && (
                <span className="message-status">
                  {msg.isRead ? '✓✓' : msg.isDelivered ? '✓' : '⏱'}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="typing-indicator">
            <span>User is typing...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;

/* 
==================================================
EXAMPLE CSS (Add to your stylesheet)
==================================================

.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.chat-header {
  padding: 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.receiver-info h3 {
  margin: 0 0 0.5rem 0;
}

.status {
  font-size: 0.9rem;
}

.status.online {
  color: green;
}

.status.offline {
  color: gray;
}

.messages-container {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message {
  display: flex;
  margin-bottom: 0.5rem;
}

.message.sent {
  justify-content: flex-end;
}

.message.received {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 0.75rem;
  border-radius: 8px;
  position: relative;
}

.message.sent .message-content {
  background: #007bff;
  color: white;
}

.message.received .message-content {
  background: #e9ecef;
  color: black;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-left: 0.5rem;
}

.message-status {
  margin-left: 0.5rem;
  font-size: 0.8rem;
}

.typing-indicator {
  font-style: italic;
  color: #666;
  font-size: 0.9rem;
}

.chat-input {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ddd;
  background: white;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.chat-input button {
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:hover {
  background: #0056b3;
}

==================================================
*/
