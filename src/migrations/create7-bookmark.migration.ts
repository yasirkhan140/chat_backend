"use strict";

import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

/** @type {import('sequelize-cli').Migration} */
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("Bookmark", {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      conversationId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Conversation",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      icon: {
        type: sequelize.STRING,
      },
      title: {
        type: sequelize.STRING,
      },
      desc: {
        type: sequelize.STRING,
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
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Bookmark");
  },
};
export default migration;
