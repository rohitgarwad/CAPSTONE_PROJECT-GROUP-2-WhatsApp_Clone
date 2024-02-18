import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {

    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-agojhuu-shard-00-00.ukgm3b2.mongodb.net:27017,ac-agojhuu-shard-00-01.ukgm3b2.mongodb.net:27017,ac-agojhuu-shard-00-02.ukgm3b2.mongodb.net:27017/?ssl=true&replicaSet=atlas-p98q7i-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log('Database Connected Successfully')

    } catch (error) {
        console.log('Error while connecting to database ', error.message);
    }
}

export default Connection;