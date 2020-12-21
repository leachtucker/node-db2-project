const express = require('express');
const db = require('../../data/car-dealer');

const router = express.Router();

// MAIN GET
router.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    } catch {
        res.status(500).json({ errorMessage: "There has been a problem with the database." });
    }
});

// GET car with specified ID
router.get('/:id', validateCarID(), async (req, res) => {
    res.status(200).json(req.car);
});

// POST car
router.post('/', async (req, res) => {
    const { make, model, vin, mileage, transmissionType, titleStatus } = req.body;

    // VERIFY for required fields
    if (!make || !model || !vin || !mileage) {
        return res.status(400).json({ errorMessage: "Missing required fields. Check for make, model, vin, and mileage." })
    }

    try {
        await db('cars').insert({ make: make, model: model, vin: vin, mileage: mileage, transmissionType: transmissionType || null, titleStatus: titleStatus || null});

        res.status(201).json({ message: "Car created!" });
    } catch {
        res.status(500).json({ errorMessage: "There has been a problem with the database." });
    }
});

router.put('/:id', validateCarID(), async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;

    // VERIFY that the request body does not have 'foreign' properties
    for (var prop in changes) {
        if (!req.car.hasOwnProperty(prop)) {
            return res.status(400).json({ errorMessage: "Request body included a property not found in the car schema" });
        }
    }

    try {
        await db('cars').where({ id: id }).update(changes);
        res.status(201).json({ message: "Car updated!" })
    } catch {
        res.status(500).json({ errorMessage: "There has been a problem with the database." });
    }
});

router.delete('/:id', validateCarID(), async (req, res) => {
    const { id } = req.params;
    try {
        await db('cars').where({ id: id }).del();
        res.status(200).json({ message: "Car deleted!" })
    } catch {
        res.status(500).json({ errorMessage: "There has been a problem with the database." });
    }
});

/* MIDDLEWARE */
function validateCarID  (req, res, next) {
    return async function (req, res, next) {
        const { id } = req.params;
        try {
            const [ car ] = await db('cars').where({ id: id })
            if (!car) {
                return res.status(404).json({ errorMessage: "There is no car with the specified ID." });
            }

            req.car = car;
            next();
        } catch {
            res.status(500).json({ errorMessage: "There has been a problem with the database." });
        }
    };
}

module.exports = router;