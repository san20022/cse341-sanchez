const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let database;

const initDb = async () => {
    if (!database) {
        await client.connect();
        database = client.db(process.env.MONGODB_DB);
        console.log('Connected to MongoDB');
    }

    return database;
};

const getDatabase = () => database;

module.exports = {
    initDb,
    getDatabase,
};
