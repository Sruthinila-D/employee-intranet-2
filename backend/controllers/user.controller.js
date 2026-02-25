const pool = require('../db');

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT user_id, email 
       FROM users 
       WHERE role = 'EMPLOYEE'
       ORDER BY user_id`
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};