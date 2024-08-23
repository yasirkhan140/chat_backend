// socket.ts
import { Server as SocketIOServer, Socket } from 'socket.io'; // Import from socket.io
import http from 'http';
import { authenticateSocket } from './authencateSocket.socket';
// Import your message model

export const setupSocketIO = (server: http.Server) => {
  const io = new SocketIOServer(server);
// Use authentication middleware for Socket.IO
io.use(authenticateSocket);
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    // Example event handler for chat messages
    socket.on('chat message', async (conversationId: string, msg: string) => {
      const message = {
        userId: (socket as any).user.id,
        conversationId,
        content: msg,
      };

      // Save message to the database
    

      // Emit message to all users in the conversation
      io.to(conversationId).emit('chat message', message);
    });

    // Handle joining a conversation
    socket.on('join conversation', (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User ${(socket as any).user.id} joined conversation ${conversationId}`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', (socket as any).user.id);
    });
  });

  return io;
};