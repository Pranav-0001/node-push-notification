import mongoose from "mongoose";

export const db = mongoose.connect('mongodb://localhost:27017/push').then(()=>{
    console.log("db started");
})