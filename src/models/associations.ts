import ConversationModel from "./conversation.model";
import ConversationMessagesModel from "./conversationMessage.model";
import ConversationParticipantsModel from "./conversationParticipants.model";
import MessageModel from "./message.model";
import User from "./user.models";
import { sequelize } from "../db/db";
import OtpModel from "./otp.models";
User.belongsToMany(ConversationModel, {
  through: ConversationParticipantsModel,
  foreignKey: "userId",
  otherKey: "conversationId",
});
MessageModel.belongsToMany(ConversationModel, {
  through: ConversationMessagesModel,
  foreignKey: "messageId",
  otherKey: "conversationId",
});
ConversationModel.belongsToMany(User, {
  through: ConversationParticipantsModel,
  foreignKey: "conversationId",
  otherKey: "userId",
});

ConversationModel.belongsToMany(MessageModel, {
  through: ConversationMessagesModel,
  foreignKey: "conversationId",
  otherKey: "messageId",
});
export {
  sequelize,
  User,
  MessageModel,
  ConversationModel,
  ConversationParticipantsModel,
  ConversationMessagesModel,
  OtpModel,
};
