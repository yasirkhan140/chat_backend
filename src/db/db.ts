type ENV = "development" | "production" | "test";

import { Sequelize } from "sequelize";
const env: ENV = (process.env.NODE_ENV as ENV) || "development";
import * as configuration from "../config/config.js";
import Config from "../config/config";

const dbEnv = configuration as Config;
const config = dbEnv[env];
export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);
const connection = () => {
  sequelize
    .authenticate()
    .then(async () => {
      console.log("connect successfully database");
    })
    .catch((err) => {
      console.log(`error in connecting database ${err}`);
    });
};

export default connection;
