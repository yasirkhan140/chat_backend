import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { ConversationTpyedModel } from "../interface";
import { User } from "./associations";

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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedFrom: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
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

export  {ConversationModel};
