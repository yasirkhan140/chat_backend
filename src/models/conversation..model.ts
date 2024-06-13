import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import User from "./user.models";
import { ConversationTpyedModel } from "../interface";

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

    participants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    messages: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      references: {
        model: "Message",
        key: "id",
      },
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
