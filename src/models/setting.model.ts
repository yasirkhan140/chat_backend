import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { BookMarkTypedModel } from "../interface";

const SetingModel = sequelize.define(
  "Setting",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    themeColor: {
      type: DataTypes.STRING,
    },
    themeImage: {
      type: DataTypes.STRING,
    },
    displayprofilePhoto: {
      type: DataTypes.STRING,
    },
    displayLastSeen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    displayStatus: {
      type: DataTypes.ENUM,
      values: ["everyone", "selected", "nobody"],
      defaultValue: "everyone",
    },
    readReceipts: {
      type: DataTypes.BOOLEAN,
    },
    displayGroups: {
      type: DataTypes.ENUM,
      values: ["everyone", "selected", "nobody"],
      defaultValue: "everyone",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Away", "Do not disturb"],
      defaultValue: "Active",
    },
    securityNotification: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: "Setting",
  }
);

export default SetingModel;
