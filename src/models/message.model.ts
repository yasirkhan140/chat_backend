import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { ConversationModel } from "./conversation.model";
import {User} from './user.models'
import { MessageTpyedModel } from "../interface";

const MessageModel = sequelize.define<MessageTpyedModel>(
  "Message",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: ConversationModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete:"CASCADE"
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    send: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    },
    receive: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "Message",
  }
);

export  {MessageModel};
