import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './api';

const CHAT_URL = import.meta.env.VITE_CHAT_URL || 'http://localhost:3004';

let socket: Socket | null = null;

export function connectSocket(): Socket {
  if (socket?.connected) return socket;

  const token = getAccessToken();
  if (!token) throw new Error('Требуется аутентификация');

  socket = io(CHAT_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('WebSocket connected');
  });

  socket.on('disconnect', (reason) => {
    console.log('WebSocket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error.message);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket(): Socket | null {
  return socket;
}

// Chat helpers
export function joinConversation(conversationId: string) {
  socket?.emit('chat:join', { conversationId });
}

export function sendSocketMessage(conversationId: string, content: string, type = 'text', attachments?: any[]) {
  socket?.emit('chat:message', { conversationId, content, type, attachments });
}

export function sendTypingIndicator(conversationId: string, isTyping: boolean) {
  socket?.emit('chat:typing', { conversationId, isTyping });
}
