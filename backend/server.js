<<<<<<< HEAD
const pool = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ticketRoutes = require('./routes/ticket.routes');
=======
const express = require("express");
const cors = require("cors");

const leaveRoutes = require("./routes/leave.routes");
>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d

const app = express();

app.use(cors());
<<<<<<< HEAD
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

=======

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/leaves", leaveRoutes);

app.listen(3000, () => {

console.log("Server running on port 3000");

});
>>>>>>> 511d2f22d19f357176e376deda97ef0204290c0d
