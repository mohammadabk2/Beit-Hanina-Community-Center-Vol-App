const { Pool } = require('pg');

// Database connection configuration
//TODO: setup the database on the server and then get these details
// TODO get all these from .en
const pool = new Pool({
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

// Function to query the database
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
};

// Export the query function
module.exports = {
  query,
  pool
};