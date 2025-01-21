import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import {  SettingTypedModel } from "../interface";
import { User } from "./user.models";

const SettingModel = sequelize.define<SettingTypedModel>(
  "Setting",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:User,
        key:"id"
      }
    },
    themeColor: {
      type: DataTypes.STRING,
      defaultValue:"bgcolor-radio1"
    },
    themeImage: {
      type: DataTypes.STRING,
      defaultValue:"bgimg-radio5"

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
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    modelName: "Setting",
  }
);
;

export  {SettingModel};
