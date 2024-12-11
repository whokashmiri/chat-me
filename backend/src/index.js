import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import {connectDB} from '../lib/db.js'
import cors from 'cors'
import {app, server} from "../lib/socket.js"
import path from 'path'

import authRoutes from '../routes/auth.route.js'
import messageRoutes from '../routes/message.route.js'

dotenv.config();
// const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))



app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }


server.listen(PORT, ()=>{
    console.log(`Server Up And Running on Port:  ${PORT}`);
    connectDB()
    
})
