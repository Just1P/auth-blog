import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
connection
  .query("SELECT NOW()")
  .then((res) => {
    console.log("Connection successful:", res.rows[0]);
  })
  .catch((err) => {
    console.error("Error executing query", err.stack);
  });

export default connection;
