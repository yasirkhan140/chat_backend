import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserTpyedModel } from "../interface";
import { SettingModel} from "./setting.model"
const User = sequelize.define<UserTpyedModel>(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    location: { type: DataTypes.STRING, defaultValue: "" },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "email", msg: "Email already exits please login" },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    profileImg: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    coverImage: {
      type: DataTypes.STRING,
        defaultValue:""
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
    lastSeen: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    modelName: "user",
    // hooks for user create then run / before saving run
    hooks: {
      async beforeCreate(user: UserTpyedModel) {
        await encrptPassword(user);
        //await createSettings(user)
      },
      async beforeUpdate(user: UserTpyedModel) {
        await encrptPassword(user);
      },
      async afterCreate(user:UserTpyedModel) {
        await createSettings(user)
      }
    },
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: undefined,
      },
    },
  }
);
// for password hash
async function encrptPassword(typedUser: UserTpyedModel) {
  if (typedUser.changed("password")) {
    typedUser.password = await bcrypt.hash(
      typedUser.get("password"),
      parseInt(process.env.HASH_ROUND_ENCRYPT as string)
    );
  }
}
async function  createSettings(typedUser: UserTpyedModel) {
  try {
   await SettingModel.create({userId:typedUser.id})
  } catch (error) {
    console.log(error.message)
  }
}
// User.prototype.verifyPassword = async function (password: string) {
//   return await bcrypt.compare(password, this.password);
// };
// for verifypassword
export const verifyPassword = async (password: string, hasPassword: string) => {
  return await bcrypt.compare(password, hasPassword);
};
// for generateRefreshToken
export const generateRefreshToken = (id: number) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    }
  );
};
// for generateAccessToken
export const generateAccessToken = (
  id: number,
  email: string,
  name: string
) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      name: name,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    }
  );
};

export  {User}
