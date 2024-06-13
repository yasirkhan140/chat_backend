import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import User from "./user.models";

const ConversationModel = sequelize.define(
  "Otp",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    participants: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    expire: {
      type: DataTypes.DATE,
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
    modelName: "otp",
  }
);

export default ConversationModel;
