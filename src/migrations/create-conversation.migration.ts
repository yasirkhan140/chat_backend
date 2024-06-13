"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("Conversation", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      participants: {
        type: sequelize.ARRAY(sequelize.INTEGER),
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      messages: {
        type: sequelize.ARRAY(sequelize.INTEGER),
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
    await queryInterface.dropTable("Conversation");
  },
};
export default migration;
