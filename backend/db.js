const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
<<<<<<< HEAD
  database: 'usecases',
  password: 'Azmath@786',
  port: 5432,
  ssl: false
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

=======
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
>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
module.exports = pool;