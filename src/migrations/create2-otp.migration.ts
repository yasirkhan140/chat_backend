"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("Otp", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      otp: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      expire: {
        type: sequelize.DATE,
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
    await queryInterface.dropTable("Otp");
  },
};
export default migration;
