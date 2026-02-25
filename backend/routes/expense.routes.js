const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/create', expenseController.createExpense);

module.exports = router;