const pool = require('../db');

exports.createExpense = async (data) => {
  const client = await pool.connect();

  try {
    const {
      user_id,
      expense_type,
      expense_date,
      amount,
      currency,
      reason,
      file_name,
      file_type,
      file_size,
      file_base64
    } = data;

    await client.query('BEGIN');

    // 1️⃣ Insert Expense
    const expenseResult = await client.query(
      `INSERT INTO expense_request
       (user_id, expense_type, expense_date, amount, currency, reason)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING expense_id`,
      [user_id, expense_type, expense_date, amount, currency, reason]
    );

    const expense_id = expenseResult.rows[0].expense_id;

    // 2️⃣ Insert Attachment
    await client.query(
      `INSERT INTO attachment
       (reference_id, reference_type, file_name, file_type, file_size, file_base64, uploaded_by)
       VALUES ($1,'EXPENSE',$2,$3,$4,$5,$6)`,
      [expense_id, file_name, file_type, file_size, file_base64, user_id]
    );

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