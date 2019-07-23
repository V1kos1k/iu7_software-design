const express = require('express');
const assert = require('assert');
const db = require('../../db');
const config = require('../../config').config;
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

async function passLaterToDB(_idTest, _idName) {
    const UsersInstance = db.mongodb.db(config.dbName).collection(config.users);
    UsersInstance.findOneAndUpdate({_id: new ObjectID(_idName)}, { $push: {idTestLater:  _idTest } }, function(err, results) {
        assert.equal(null, err);
        console.log(results);
    });
}

router.get('/', async function (req, res) {
	const idTest = req.query.idTest;
	const idName = req.query.idName;
	
	passLaterToDB(idTest, idName);

    res.sendFile(__dirname + '/testsPage.html');
});

module.exports = router; 