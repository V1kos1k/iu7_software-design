const express = require('express');
const db = require('../../db');
const config = require('../../config').config;

const router = express.Router();

// Getting all Tests from Collection
async function loadTestsCollection() {
    return db.mongodb.db(config.dbName).collection(config.tests);
}

// Get Messages
router.get('/', async (req, res) => {
    const tests = await loadTestsCollection();
    res.json(await tests.find().toArray());  // Sending JSON with Tests collcetion
});

module.exports = router;