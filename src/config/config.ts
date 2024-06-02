import { Dialect } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

export default interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}
module.exports = <Config>{
  development: {
    username: "postgres",
    password: "9528",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "9528",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
  },
};
