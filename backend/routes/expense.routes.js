const express = require('express');
const router = express.Router();
const multer = require('multer');
const expenseController = require('../controllers/expense.controller');
const path = require('path');
// Store file in memory (NOT in folder)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === '.pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files allowed'), false);
  }
}
});

router.post('/create', upload.array('bills',5), expenseController.createExpense);
router.get('/', expenseController.getAllExpenses); 

module.exports = router;