import mongoose from 'mongoose';
const MONGODB_URL = process.env.MONGODB_URL
if (!MONGODB_URL) {
    throw new Error("please difine mongo environment variable")
}
async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    }
    await mongoose.connect(MONGODB_URL!, opts);
    return mongoose
}
export default connectToDatabase;