import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres::memory:");

const User = sequelize.define(
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
