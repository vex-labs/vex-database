require('dotenv').config();
const { MongoClient } = require('mongodb');
const config = require('./config');

// Connection URI from environment variables
const uri = process.env.MONGODB_URI;
const { dbName, collections } = config;

async function writeUser(user) {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collections.users);
        
        // Insert single user
        const result = await collection.insertOne(user);
        console.log(`User was inserted with id: ${result.insertedId}`);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

// Example usage - public_key is optional
const user = {
    "account_id": "next-example.testnet",
    "username": "NewUser",
    "leaderboard_on": true,
    "recommended_matches_on": true,
    "public_key": "ed25519:E8emaKf7GjdzTqg5Td9CmDd8CD2AHHaCi1mu5Lfv1dKr" // Optional field
};

writeUser(user);
