import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter, userRouter } from "./src/routes/index";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = 3000;

app.listen(port, () => {
    console.log("start!!!", port);
});
