const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

module.exports = {
    MongoClient,
    uri
};