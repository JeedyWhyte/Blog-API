const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@todos.wnbqyqu.mongodb.net/?appName=Todos`);
        console.log('Connected to MongoDB');
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;