const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expense.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/expense', expenseRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});