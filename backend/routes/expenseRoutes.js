// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');

router.use(verifyToken); // Terapkan middleware ke semua route di bawah ini
router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
module.exports = router;