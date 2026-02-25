const pool = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ticketRoutes = require('./routes/ticket.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/tickets', ticketRoutes);
const attachmentRoutes = require('./routes/attachment.routes');

pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));



app.use('/api/attachments', attachmentRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

