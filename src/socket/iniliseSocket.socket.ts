// socket.ts
import { Server as SocketIOServer, Socket } from "socket.io"; // Import from socket.io
import http from "http";
import { authenticateSocket } from "./authencateSocket.socket";
import {
  ConversationModel,
  ConversationParticipantsModel,
  MessageModel,
  User,
} from "../models/associations";

import {
  ConversationParticipantsTpyedModel,
  ConversationTpyedModel,
  MessageTpyedModel,
} from "../interface";
import { UserTpyedModel } from "../interface/index";
// Import your message model
interface IExtistsConversation extends ConversationParticipantsTpyedModel {
  user: UserTpyedModel;
  secondUser: UserTpyedModel;
  conversation: ConversationTpyedModel;
}

export const setupSocketIO = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });
  // Use authentication middleware for Socket.IO
  io.use(authenticateSocket);
  io.on("connection", (socket: Socket) => {
    // Example event handler for chat messages
    socket.on(`send message`, async (conversationId: string, params: any) => {
      const conversationIdInt = parseInt(conversationId);
      const message = {
        conversationId,
        params,
      };
      const conversationExists = await ConversationModel.findOne({
        where: { id: conversationIdInt },
      });

      if (!conversationExists) {
        socket.emit("error", "Conversation does not exist");
        return;
      }
      // Save message to the database
      const savedMessage = await MessageModel.create({
        conversationId: conversationIdInt,
        message: params.message,
        senderId: params.senderId,
        attachment: params.attachment || null,
        time: new Date(),
      });
      savedMessage.send = true;
      savedMessage.save();

      // Emit message to all users in the conversation
      io.to(conversationId).emit("recieved message", message);
    });
    // Handle reading a message
    socket.on(`read message`, async (conversationId: string, params: any) => {
      const conversationIdInt = parseInt(conversationId);
      const conversationExists = await ConversationModel.findOne({
        where: { id: conversationIdInt },
      });
      if (!conversationExists) {
        socket.emit("error", "Conversation does not exist");
        return;
      }
      const messages = await MessageModel.findAll({
        where: { conversationId: conversationIdInt },
      });
      messages.forEach(async (message) => {
        message.isRead = true;
        message.receive = true;
        message.save();
      });
      // Emit message to all users in the conversation
      io.to(conversationId).emit("read message", params);
    });
    // Handle delete a message
    socket.on(`delete message`, async (conversationId: string, params: any) => {
      const conversationIdInt = parseInt(conversationId);
      const conversationExists = await ConversationModel.findOne({
        where: { id: conversationIdInt },
      });
      if (!conversationExists) {
        socket.emit("error", "Conversation does not exist");
        return;
      }
      const message = await MessageModel.findOne({
        where: { id: params.messageId },
      });
      if (!message) {
        socket.emit("error", "Message does not exist");
        return;
      }
      message.destroy();
      message.save();
      // Emit message to all users in the conversation
      io.to(conversationId).emit("delete message", params);
    });
    // Handle joining a conversation
    socket.on("join conversation", (conversationId: string) => {
      socket.join(conversationId);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", (socket as any).user.id);
    });
  });

  return io;
};
