import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI || '';
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri);
        console.log('Connected to MONGODB')
    } catch (err) {
        console.error(err);
        console.log("Error connecting to database");
    }
}

export default connectDB 