require('dotenv').config();
const { MongoClient } = require('mongodb');
const config = require('./config');

// Connection URI from environment variables
const uri = process.env.MONGODB_URI;
const { dbName, collections } = config;

async function readUsers() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collections.users);
        
        // Find all users
        const users = await collection.find({}).toArray();
        console.log('Users:', users);
        
        // Example: Find specific user by account_id
        const specificUser = await collection.findOne({ 
            account_id: "betvex-setup.testnet" 
        });
        console.log('Specific user:', specificUser);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

readUsers();
