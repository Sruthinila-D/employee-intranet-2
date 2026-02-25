const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'policy_db',
  password: 'User@123',
  port: 5432,
});
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL Connected Successfully");
    client.release();
  })
  .catch(err => {
    console.error("❌ PostgreSQL Connection Failed:", err.message);
  });
module.exports = pool;