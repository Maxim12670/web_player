import express from "express";
const fileUpload = require("express-fileupload");
import cors from "cors";
// const bodyParser = require("body-parser");
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter, userRouter, trackRouter } from "./src/routes/index";

dotenv.config();

const app = express();
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/track", trackRouter);

const port = 3001;

app.listen(port, () => {
    console.log("start!!!", port);
});
