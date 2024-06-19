import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { ConversationTpyedModel } from "../interface";
import ConversationParticipantsModel from "./conversationParticipants.model";
import ConversationMessagesModel from "./conversationMessage.model";
import MessageModel from "./message.model";
import User from "./user.models";

const ConversationModel = sequelize.define<ConversationTpyedModel>(
  "Conversation",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    modelName: "Conversation",
  }
);

export default ConversationModel;
