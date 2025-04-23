
import express from "express"
import { connectDB } from './db/database.db';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config as configDotenv } from 'dotenv';
import userRouter from './routes/user.route';


configDotenv();
const port = process.env.PORT || 5000 ;

connectDB();
const app=express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}));

// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to parse application/json
app.use(express.json());

app.use('/api/v1/auth', userRouter);
console.log("in index.ts")
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})