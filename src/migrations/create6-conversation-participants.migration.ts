"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("ConversationParticipants", {
      id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      conversationId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Conversation",
          key: "id",
        },
      },
      userId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
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
    await queryInterface.dropTable("ConversationParticipants");
  },
};
export default migration;
