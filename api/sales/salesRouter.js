const express = require('express');
const db = require('../../data/car-dealer');

const router = express.Router();


// GET main
router.get('/', async (req, res) => {
    try {
        const sales = await db('sales');
        res.status(200).json(sales);
    } catch {
        res.status(500).json({ errorMessage: "There has been an error with the database."});
    }
});

module.exports = router;