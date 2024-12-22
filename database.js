const { MongoClient } = require("mongodb");
const mongoUri = process.env.MONGO_URI;

const client = new MongoClient(mongoUri);
const database = client.db("serve-sense");
const servicesCollection = database.collection("services");
const reviewCollection = database.collection("reviews");

module.exports = { client, servicesCollection, reviewCollection };
