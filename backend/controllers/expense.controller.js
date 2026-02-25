const expenseService = require('../services/expense.service');

exports.createExpense = async (req, res) => {
  try {
    const result = await expenseService.createExpense(req);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAllExpenses = async (req, res) => {
  try {
    const data = await expenseService.getAllExpenses();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};