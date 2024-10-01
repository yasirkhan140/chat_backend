// socket.ts
import { Server as SocketIOServer, Socket } from "socket.io"; // Import from socket.io
import http from "http";
import { authenticateSocket } from "./authencateSocket.socket";
import MessageModel from "../models/message.model";
import ConversationMessagesModel from "../models/conversationMessage.model";
import ConversationModel from "../models/conversation.model";
import ConversationParticipantsModel from "../models/conversationParticipants.model";
import User from "../models/user.models";
import { ConversationParticipantsTpyedModel, ConversationTpyedModel } from "../interface";
import { UserTpyedModel } from '../interface/index';
// Import your message model
interface IExtistsConversation extends ConversationParticipantsTpyedModel{
  user:UserTpyedModel,
  secondUser:UserTpyedModel,
  conversation:ConversationTpyedModel
}
export const setupSocketIO = (server: http.Server) => {
  const io = new SocketIOServer(server,{cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }});
  // Use authentication middleware for Socket.IO
  io.use(authenticateSocket);
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Example event handler for chat messages
    socket.on(`chat message`, async (conversationId: string, msg: string,time:any) => {
      console.log(conversationId,msg)
      const user = (socket as any).user;
      const message = {
        userId: (socket as any).user.id,
        conversationId,
        content: msg,
      };
      const conversationExists = await ConversationParticipantsModel.findOne({
        where: { conversationId: parseInt(conversationId) },
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
      }) as IExtistsConversation;

      if (!conversationExists) {
        console.error(`Conversation with ID ${conversationId} does not exist.`);
        return;
      }
      console.log(conversationExists.user.id,conversationExists.secondUser.id)
      const messageSaved = await MessageModel.create({
        message: msg,
        senderId: user.id,
        receiverId:user.id=== conversationExists.secondUser.id?conversationExists.user.id:conversationExists.secondUser.id,
        time:time
      });
      await ConversationMessagesModel.create({
        messageId: messageSaved.id,
        conversationId: parseInt(conversationId),
      });
      console.log(message);
      // Save message to the database

      // Emit message to all users in the conversation
      io.to(conversationId).emit("recieved message", message);
    });

    // Handle joining a conversation
    socket.on("join conversation", (conversationId: string) => {
      socket.join(conversationId);
      console.log(
        `User ${(socket as any).user.id} joined conversation ${conversationId}`
      );
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", (socket as any).user.id);
    });
  });

  return io;
};
