import { Dialect } from "sequelize";

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}
const config: Config = {
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
export default config;
