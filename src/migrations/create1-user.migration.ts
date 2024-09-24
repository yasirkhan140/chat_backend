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
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      profileImg: {
        type: sequelize.STRING(),
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
