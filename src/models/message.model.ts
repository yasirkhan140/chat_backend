import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import User from "./user.models";
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
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
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

MessageModel.belongsTo(User, {
  foreignKey: "senderId",
  as: "user",
});
MessageModel.belongsTo(User, {
  foreignKey: "receiverId",
  as: "secondUser",
});
export default MessageModel;
