//require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(` server is running at the PORT : ${process.env.PORT}`);
    })
})

.catch((err)=>{
    console.error("MongoDB connection failed ",err);
})




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