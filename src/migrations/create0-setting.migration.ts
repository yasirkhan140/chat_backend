"use strict";

import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

/** @type {import('sequelize-cli').Migration} */
const migration = {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    await queryInterface.createTable("Setting", {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
userId:{
  type:sequelize.INTEGER,
  allowNull:false
},
      themeColor: {
        type: sequelize.STRING,
        defaultValue: "bgcolor-radio1",
      },
      themeImage: {
        type: sequelize.STRING,
        defaultValue: "bgimg-radio5",
      },
      displayprofilePhoto: {
        type: sequelize.STRING,
        defaultValue: "",
      },
      displayLastSeen: {
        type: sequelize.BOOLEAN,
        defaultValue: true,
      },
      displayStatus: {
        type: sequelize.ENUM,
        values: ["everyone", "selected", "nobody"],
        defaultValue: "everyone",
      },
      readReceipts: {
        type: sequelize.BOOLEAN,
        defaultValue: true,
      },
      displayGroups: {
        type: sequelize.ENUM,
        values: ["everyone", "selected", "nobody"],
        defaultValue: "everyone",
      },
      status: {
        type: sequelize.ENUM,
        values: ["Active", "Away", "Do not disturb"],
        defaultValue: "Active",
      },
      securityNotification: {
        type: sequelize.BOOLEAN,
        defaultValue: true,
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
      }
      
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Setting");
  },
};
export default migration;
