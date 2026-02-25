const pool = require('../db');

const createAttachment = async (data) => {
  const {
    reference_id,
    reference_type,
    file_name,
    file_type,
    file_size,
    file_base64,
    uploaded_by
  } = data;

  const query = `
    INSERT INTO attachment
    (reference_id, reference_type, file_name, file_type, file_size, file_base64, uploaded_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    reference_id,
    reference_type,
    file_name,
    file_type,
    file_size,
    file_base64,
    uploaded_by
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAttachmentsByReference = async (reference_id, reference_type) => {
  const result = await pool.query(
    `SELECT * FROM attachment
     WHERE reference_id = $1 AND reference_type = $2`,
    [reference_id, reference_type]
  );
  return result.rows;
};

const getAttachmentByTicket = async (ticketId) => {
  const result = await pool.query(
    `SELECT * FROM attachment
     WHERE reference_id = $1 
     AND reference_type = 'TICKET'
     ORDER BY created_at DESC
     LIMIT 1`,
    [ticketId]
  );

  return result.rows[0];
};

module.exports = {
  createAttachment,
  getAttachmentsByReference,
  getAttachmentByTicket
};