// socket.ts
import { Server as SocketIOServer, Socket } from "socket.io"; // Import from socket.io
import http from "http";
import { authenticateSocket } from "./authencateSocket.socket";
import { ConversationModel, ConversationParticipantsModel, MessageModel, User} from "../models/associations";


import {
  ConversationParticipantsTpyedModel,
  ConversationTpyedModel,
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
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  // Use authentication middleware for Socket.IO
  io.use(authenticateSocket);
  io.on("connection", (socket: Socket) => {
    // Example event handler for chat messages
    socket.on(`chat message`, async (conversationId: string, params: any) => {
      const conversationIdInt= parseInt(conversationId)
      const message = {
        conversationId,
        params,
      };
      const conversationExists = (await ConversationParticipantsModel.findOne({
        where: { conversationId:conversationIdInt },
        include: [
          {
            model: ConversationModel,
            as: "conversation",
          },
          {
            model: User,
            as: "user",
          },
          {
            model: User,
            as: "secondUser",
          },
        ],
      })) as IExtistsConversation;

      if (!conversationExists) {
        console.error(`Conversation with ID ${conversationId} does not exist.`);
        return;
      }
     await MessageModel.create({
        message: params.text,
        senderId: params.meta.sender,
        time: params.time,
        conversationId:conversationIdInt
      });
      // Save message to the database

      // Emit message to all users in the conversation
      io.to(conversationId).emit("recieved message", message);
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
