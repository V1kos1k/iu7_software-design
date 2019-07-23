const express = require('express');
const router = express.Router();

// Render main page
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/mainPage.html');
});

module.exports = router; 