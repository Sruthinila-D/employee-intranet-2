const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expense.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Important for base64

app.use('/api/expense', expenseRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});