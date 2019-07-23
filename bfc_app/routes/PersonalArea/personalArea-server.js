const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/personalArea.html');
});

module.exports = router; 