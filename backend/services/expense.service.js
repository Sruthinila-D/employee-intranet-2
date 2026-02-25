const pool = require('../db');

exports.createExpense = async (req) => {
  const client = await pool.connect();

  try {
    const {
      user_id,
      expense_type,
      expense_date,
      amount,
      currency,
      reason
    } = req.body;

    const files = req.files;

    if (!files || files.length === 0) {
      throw new Error('At least one PDF file is required');
    }

    await client.query('BEGIN');

    // 1️⃣ Insert expense_request
    const expenseResult = await client.query(
      `INSERT INTO expense_request
       (user_id, expense_type, expense_date, amount, currency, reason)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING expense_id`,
      [user_id, expense_type, expense_date, amount, currency, reason]
    );

    const expense_id = expenseResult.rows[0].expense_id;

    // 2️⃣ Insert multiple attachments
    for (const file of files) {

      const file_base64 = file.buffer.toString('base64');

      await client.query(
        `INSERT INTO attachment
         (reference_id, reference_type, file_name, file_type, file_size, file_base64, uploaded_by)
         VALUES ($1,'EXPENSE',$2,$3,$4,$5,$6)`,
        [
          expense_id,
          file.originalname,
          file.mimetype,
          file.size,
          file_base64,
          user_id
        ]
      );
    }

    await client.query('COMMIT');

    return {
      message: 'Expense created successfully',
      expense_id
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getAllExpenses = async () => {

  const result = await pool.query(`
    SELECT 
      expense_id,
      user_id,
      expense_type,
      expense_date,
      amount,
      currency,
      reason,
      status,
      created_at
    FROM expense_request
    ORDER BY expense_id DESC
  `);

  return result.rows;
};