import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "../src/routes/user.routes.js";
import {clothingItemRouter} from './routes/clothingItem.routes.js'
app.use("/WearSuggest/v1/user", userRoutes);
app.use("/WearSuggest/v1/clothingItem",clothingItemRouter)
export { app };
