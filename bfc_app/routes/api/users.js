const express = require('express');
const assert = require('assert');
const db = require('../../db');
const config = require('../../config').config;

const router = express.Router();

// Getting all Users from Collection
async function loadUsersCollection() {
    return db.mongodb.db(config.dbName).collection(config.users);
}

// Get Messages
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.json(await users.find().toArray());  // Sending JSON with Users collcetion
});

module.exports = router;