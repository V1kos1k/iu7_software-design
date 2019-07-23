const express = require('express');
const assert = require('assert');
const db = require('../../db');
const config = require('../../config').config;
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

// новая запись в db
async function toDB(_testName, _name) {
	const TestsInstance = db.mongodb.db(config.dbName).collection(config.tests);
    TestsInstance.insertOne({
    	testName: _testName,
    	name: _name,
    }, function(err, results) {
        assert.equal(null, err);
    });
}

async function questionToDB(_idTest, _testName, _questionName, _answers, _options, _name) {
	const TestsInstance = db.mongodb.db(config.dbName).collection(config.tests);
    TestsInstance.insertOne({
    	idTest: _idTest,
    	testName: _testName,
    	questionName: _questionName,
    	answers:  [_answers[0], _answers[1], _answers[2]],
    	options: [_options[0], _options[1], _options[2]],
    	name: _name,
    }, function(err, results) {
        assert.equal(null, err);
        console.log(results);
    });
}

router.get('/', async function (req, res) {
	var options = [];
	var answers = [];
	const idTest = req.query.idtest;
	const testName = req.query.testname;
	const questionName = req.query.questioname;
	options.push(req.query.options0);
	options.push(req.query.options1);
	options.push(req.query.options2);
	answers.push(req.query.answers0);
	answers.push(req.query.answers1);
	answers.push(req.query.answers2);
	const name = req.query.name;
	const newQuestion = req.query.newquestion;
	
	console.log(answers);
	
	if (newQuestion != null && idTest != null && testName != null && questionName != null 
		&& answers != null && options != null && name != null) {
		await questionToDB(idTest, testName, questionName, answers, options, name);
	}
	
	if (testName != null && newQuestion == null) {
		await toDB(testName, name);
	}
	
    res.sendFile(__dirname + '/addTest.html');
});



module.exports = router; 