"use strict";

import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

/** @type {import('sequelize-cli').Migration} */
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: sequelize.STRING,
      },
      lastName: {
        type: sequelize.STRING,
      },
      email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      location: { type: sequelize.STRING, defaultValue: "" },
      profileImg: {
        type: sequelize.STRING,
        defaultValue: "",
      },
      coverImage: {
        type: sequelize.STRING,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      password: {
        type: sequelize.STRING(64),
        validate: {
          is: /^[0-9a-f]{64}$/i,
        },
        allowNull: false,
      },
      refreshToken: {
        type: sequelize.TEXT,
      },
      settings:{
        type:sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Setting",
          key: "id",
        },
        onDelete: "CASCADE",
    },
      deletedAt: {
        type: sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("User");
  },
};
export default migration;
