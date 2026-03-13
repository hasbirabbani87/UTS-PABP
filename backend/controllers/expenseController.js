const db = require('../config/db');

exports.getExpenses = async (req, res) => {
    try {
        const [expenses] = await db.query('SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC', [req.userId]);
        res.status(200).json(expenses);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        await db.query(
            'INSERT INTO expenses (title, amount, category, date, user_id) VALUES (?, ?, ?, ?, ?)',
            [title, amount, category, date, req.userId]
        );
        res.status(201).json({ message: "Expense berhasil ditambahkan!" });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const { id } = req.params;
        await db.query(
            'UPDATE expenses SET title=?, amount=?, category=?, date=? WHERE id=? AND user_id=?',
            [title, amount, category, date, id, req.userId]
        );
        res.status(200).json({ message: "Expense berhasil diupdate!" });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM expenses WHERE id=? AND user_id=?', [id, req.userId]);
        res.status(200).json({ message: "Expense berhasil dihapus!" });
    } catch (error) { res.status(500).json({ error: error.message }); }
};