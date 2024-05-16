import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

import app from './app.js';

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);

        console.log('Connected to mongoDB ');
    } catch (error) {
        throw error;
    }
};

app.listen(5000, () => {
    connect();
    console.log('Server running ...');
});
