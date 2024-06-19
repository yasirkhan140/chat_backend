"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("Message", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      senderId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      receiverId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      message: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      deletedAt: {
        type: sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.dropTable("Message");
  },
};
export default migration;
