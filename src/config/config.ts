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
    username: "root",
    password: "9528",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
export default config;
