import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { OtpTpyedModel } from "../interface";
import User from "./user.models";
import jwt, { Secret } from "jsonwebtoken";
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
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otpToken: {
      type: DataTypes.TEXT,
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
    hooks: {
      beforeCreate(otp: OtpTpyedModel) {
        generateToken(otp);
      },
    },
    defaultScope: {
      attributes: { exclude: ["expire"] },
    },
    scopes: {
      withOtp: {
        attributes: undefined,
      },
    },
  }
);
OtpModel.belongsTo(User, {
  foreignKey: "userId",
});
const generateToken = (otp: OtpTpyedModel) => {
  if (otp.changed("otp")) {
    otp.otpToken = jwt.sign(
      {
        id: otp.id,
      },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
      }
    );
  }
};
export default OtpModel;
