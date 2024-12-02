import { Pool } from "pg";

const connection = new Pool({
  user: "Justin",
  host: "localhost",
  database: "blog_db",
  password: "bonjour_hello",
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
