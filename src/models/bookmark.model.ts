import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { BookMarkTypedModel } from "../interface";
import User from "./user.models";

const BookMarkModel = sequelize.define<BookMarkTypedModel>(
  "Bookmark",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
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
    modelName: "Bookmark",
  }
);

export default BookMarkModel;
