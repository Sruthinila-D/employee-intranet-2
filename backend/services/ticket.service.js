const pool = require('../db');

function generateTicketNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TKT-${year}-${random}`;
}

exports.createTicket = async (data) => {
  const { user_id, title, description, category, priority } = data;

  const ticketNumber = generateTicketNumber();

  const query = `
    INSERT INTO ticket_request 
    (ticket_number, user_id, title, description, category, priority)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    ticketNumber,
    user_id,
    title,
    description,
    category,
    priority
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getAllTickets = async () => {
  const result = await pool.query(`
    SELECT 
      t.*,
      EXISTS (
        SELECT 1 
        FROM attachment a 
        WHERE a.reference_id = t.ticket_id 
        AND a.reference_type = 'TICKET'
      ) AS has_attachment
    FROM ticket_request t
    WHERE t.is_active = TRUE
    ORDER BY t.created_at DESC
  `);

  return result.rows;
};

exports.getTicketById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM ticket_request WHERE ticket_id = $1',
    [id]
  );
  return result.rows[0];
};

exports.updateTicketStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE ticket_request
     SET status = $1,
         resolved_at = CASE 
           WHEN $1 = 'RESOLVED' THEN CURRENT_TIMESTAMP
           ELSE NULL
         END
     WHERE ticket_id = $2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0];
};

exports.deleteTicket = async (id) => {
  await pool.query(
    `UPDATE ticket_request
     SET is_active = FALSE
     WHERE ticket_id = $1`,
    [id]
  );
};