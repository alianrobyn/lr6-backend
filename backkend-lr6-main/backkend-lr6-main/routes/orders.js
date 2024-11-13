const express = require('express');
const router = express.Router();
const pool = require('../models/orderModel');

// Створення нового замовлення
router.post('/', async (req, res) => {
    const { place1, date, place2, surname, name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO orders (place1, date, place2, surname, name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [place1, date, place2, surname, name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Отримання всіх замовлень
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
