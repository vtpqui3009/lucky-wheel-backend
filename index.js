import express from 'express';
import mongoose from "mongoose";

import {UserRouter} from "./routes/UserRouter.js";
import {RewardRouter} from "./routes/RewardRouter.js";
import { HistoryRouter } from './routes/HistoryRouter.js';

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/api/user", UserRouter);
app.use("/api/rewards", RewardRouter);
app.use("/api/history", HistoryRouter);

app.get("/" , () => {
    return {message: "Hello to lucky wheel !"}
})

const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://vtpqui:KFzRm2bdbd64W1gf@cluster0.8rw5yp4.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

app.listen(5000, () => {
    console.log("Listening on port 5000");
});

connectDb();
