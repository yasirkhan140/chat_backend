import {User} from "./user.models";
import {ConversationModel} from "./conversation.model";
import {MessageModel} from "./message.model";
import {ConversationParticipantsModel} from "./conversationParticipants.model";
import {SettingModel} from "./setting.model";
import NotificationModel from "./notification.model";
import { OtpModel } from "./otp.models";
import { BookMarkModel } from "./bookmark.model";
// Associations
ConversationModel.hasMany(MessageModel, { foreignKey: "conversationId" });
MessageModel.belongsTo(ConversationModel, { foreignKey: "conversationId" });

User.hasMany(MessageModel, { foreignKey: "senderId" });
MessageModel.belongsTo(User, { foreignKey: "senderId" });

ConversationModel.belongsToMany(User, {
  through: ConversationParticipantsModel,
  foreignKey: "conversationId",
});
User.belongsToMany(ConversationModel, {
  through: ConversationParticipantsModel,
  foreignKey: "userId",
});

User.hasOne(SettingModel, { foreignKey: "userId" });
SettingModel.belongsTo(User, { foreignKey: "userId" });

User.hasMany(NotificationModel, { foreignKey: "userId" });
NotificationModel.belongsTo(User, { foreignKey: "userId" });

BookMarkModel.belongsTo(User, { foreignKey: "userId" });
User.hasMany(BookMarkModel, { foreignKey: "userId" });

// Bookmark belongs to a Conversation
BookMarkModel.belongsTo(ConversationModel, { foreignKey: "conversationId" });
ConversationModel.hasMany(BookMarkModel, { foreignKey: "conversationId" });
export {
  User,
  ConversationModel,
  MessageModel,
  ConversationParticipantsModel,
  SettingModel,
  NotificationModel,
  OtpModel,
  BookMarkModel
};
