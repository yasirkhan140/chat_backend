import Pool from "pg";
const pool = new Pool.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "9528",
  port: 5432,
});

export default pool;
