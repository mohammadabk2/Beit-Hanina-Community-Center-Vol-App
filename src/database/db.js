import { Pool } from "pg";
// const dotenv = require("dotenv");

// Database connection configuration
//TODO: setup the database on the server and then get these details
// TODO get all these from .en
const pool = new Pool({
  user: process.env.DBUSER || "user",
  host: process.env.DB_HOST || "local",
  database: process.env.DB_NAME || "DB_Name",
  password: process.env.DB_PASS || "password",
  port: process.env.DBPORT || 5000,
});

// Function to query the database
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

// Export the query function
export { query, pool };
