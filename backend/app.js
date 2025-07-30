import express, { urlencoded } from "express";
import { config } from "dotenv";
import { connectDB } from "./database/dbConnection.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRoute.js";

const app=express();

config({path:"./config/config.env"})

app.use(express.json());
app.use(cors({
        origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser());
app.use(urlencoded({extended:true}))

app.use("/api/v1/user/",userRouter)


connectDB()

app.use(errorMiddleware)

export default app;