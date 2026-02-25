const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usecases',
  password: 'Azmath@786',
  port: 5432,
  ssl: false
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

module.exports = pool;