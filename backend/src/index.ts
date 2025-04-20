import dotenv from 'dotenv';
import express from "express"
dotenv.config();
import userRouter from './routes/user.route';

const app=express();
app.use(express.json());

app.use('/api/v1/auth', userRouter);


