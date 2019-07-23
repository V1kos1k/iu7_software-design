const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../bfc_app/config').config;

// Create a new MongoClient
const client = new MongoClient(config.url,  { useNewUrlParser: true });

//console.log("(3)");

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to MongoDB server");
});

module.exports.mongodb = client;