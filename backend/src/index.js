import express from 'express';
import cookieParser from 'cookie-parser';
import{app,server} from './lib/socket.js';
import path from 'path';
app.use(cookieParser());
import dotenv  from "dotenv";
import { connectDB } from './lib/db.js';
import authRouter from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
dotenv.config()
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));


const PORT = process.env.PORT
const __dirname = path.resolve();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
       
    }
))
app.use("/api/auth",authRouter);

app.use("/api/messages",messageRoutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}
server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
    connectDB();
}
);

