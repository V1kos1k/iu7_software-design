const express = require('express');
const assert = require('assert');
const db = require('../../db');
const config = require('../../config').config;
const router = express.Router();


async function toDB(_name, _email, _pass) {
	const UsersInstance = db.mongodb.db(config.dbName).collection(config.users);
    UsersInstance.insertOne({
    	name: _name,
    	email: _email,
    	pass: _pass
    }, function(err, results) {
        assert.equal(null, err);
        console.log("(2)");
    });
}


router.get('/', async function (req, res) {
	const name = req.query.name;
	const email = req.query.email;
	const pass = req.query.pass;
	
	if (name != null && email != null && pass != null){
		await toDB(name, email, pass);
	}
	console.log("(2)");
	
    res.sendFile(__dirname + '/signUp.html');
    
});

module.exports = router; 