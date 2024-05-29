import Pool from "pg";
import { Sequelize } from "sequelize";
const pool = new Pool.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "9528",
  port: 5432,
});
const sequelize = new Sequelize("postgres", "postgres", "9528", {
  host: "localhost",
  dialect: "postgres",
});
export default sequelize;
