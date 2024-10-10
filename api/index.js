import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const app = express();

mongoose.connect(process.env.mongo_url).then(()=>console.log("conexion exitosa"))

app.use(cors());
app.use(helmet())

app.get("/",(req, res)=>{
    res.send("Hola desde mi servidor")
})

app.listen(4000, ()=>console.log("Server is running"))

