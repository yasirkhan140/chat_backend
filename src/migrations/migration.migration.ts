import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";
const migration = {
    async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
      await queryInterface.removeColumn("User", "settings");
    },
    async down(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
      await queryInterface.addColumn("User", "settings", {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {}, // Add default value if re-adding
      });
    },
  };
  export default migration;