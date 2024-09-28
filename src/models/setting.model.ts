import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import {  SettingTypedModel } from "../interface";

const SetingModel = sequelize.define<SettingTypedModel>(
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
      defaultValue:""
    },
    themeImage: {
      type: DataTypes.STRING,
      defaultValue:""

    },
    displayprofilePhoto: {
      type: DataTypes.STRING,
      defaultValue:""

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
      defaultValue:true
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
