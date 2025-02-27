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
      
      time: {
        type: sequelize.DATE,
        allowNull: false,
      },
      attachment: {
        type: sequelize.STRING,
        allowNull: true,
      },
      conversationId: {
        type: sequelize.INTEGER,
        references: {
          model: "Conversations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      
      isRead: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      send: {
        type: sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: true,
      },
      receive: {
        type: sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false,
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
