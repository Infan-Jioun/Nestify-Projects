import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("Please define MONGODB_URL in your environment variables");
}

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    };
    if (!MONGODB_URL) {
        throw new Error("Please define the MONGODB_URL environment variable");
    }
    await mongoose.connect(MONGODB_URL, opts);

    return mongoose;
}

export default connectToDatabase;
