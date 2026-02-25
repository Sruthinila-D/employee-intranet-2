const expenseService = require('../services/expense.service');

exports.createExpense = async (req, res) => {
  try {
    const result = await expenseService.createExpense(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ message: 'Expense creation failed' });
  }
};