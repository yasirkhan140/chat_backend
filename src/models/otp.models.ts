import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { OtpTpyedModel } from "../interface";
import { User } from "./associations";
const OtpModel = sequelize.define<OtpTpyedModel>(
  "Otp",
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
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    defaultScope: {
      attributes: { exclude: ["otp"] },
    },
    scopes: {
      withOtp: {
        attributes: undefined,
      },
    },
  }
);


export  {OtpModel};
