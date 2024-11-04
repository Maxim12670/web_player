import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/auth", authRouter);

const port = 3000;

app.listen(port, () => {
    console.log("start!!!", port);
});
