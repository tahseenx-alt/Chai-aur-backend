import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

// second apporach for connect  to data base 

const connectDB = async ()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongooDB connected !! ${connectionInstance.connection.host}`); 
    } catch (error) {
        console.error("Mongoose Connection Error ",error);
        process.exit(1);
    }
}

export default connectDB