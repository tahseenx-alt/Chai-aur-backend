import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// src/db/index.js

const connectDB = async () => {
    try {
        // Log it once to see exactly what is being sent
        console.log("Connecting to:", `${process.env.MONGODB_URI}/${DB_NAME}`);

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR: ", error);
        process.exit(1);
    }
    
};

export default connectDB;