import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserTpyedModel } from "../interface";

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
      // allowNull defaults to true
    },
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
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
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
      },
      async beforeUpdate(user: UserTpyedModel) {
        await encrptPassword(user);
      },
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
export default User;
