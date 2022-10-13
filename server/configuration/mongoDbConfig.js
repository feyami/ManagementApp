import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const dbUrl = `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`

const connect = async () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', console.error);
    mongoose.connection.on('disconnected', connect);
    mongoose.connection.on('open', () => {
        console.log('Connected to Mongoose');
    });
};

export default connect;