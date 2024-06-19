"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("ConversationMessages", {
      conversationId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Conversation",
          key: "id",
        },
      },
      messageId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Message",
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
    await queryInterface.dropTable("ConversationMessages");
  },
};
export default migration;
