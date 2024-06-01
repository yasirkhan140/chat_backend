type ENV = "development" | "production" | "test";

import configuration from "../config/config.js";
import { Sequelize } from "sequelize";
const env: ENV = ["development", "production", "test"].includes(
  process.env.NODE_ENV as ENV
)
  ? (process.env.NODE_ENV as ENV)
  : "development";
const config = configuration[env];
const connection = () => {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    }
  );
  sequelize
    .authenticate()
    .then(async () => {
      let user = null;
      console.log("connect successfully database");
    })
    .catch((err) => {
      console.log(`error in connecting database ${err}`);
    });
};

export default connection;
