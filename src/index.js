//require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})



connectDB()




/*
// connect to database  first apporach 
import express from "express"
const app = express();
;(()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",()=>{
            console.log("Error",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening in ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR:",error);
        throw error;
    }
})()
*/