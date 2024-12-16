import express from "express";
import path from "path";
const fileUpload = require("express-fileupload");
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter, userRouter, trackRouter, playlistRouter, playlistTrackRouter, favoriteTrackRouter } from "./src/routes/index";

dotenv.config();

const app = express();
app.use("/cloud", express.static(path.join(__dirname, "./src/cloud")));
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/track", trackRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/playlist-track", playlistTrackRouter);
app.use('/api/favorite-track', favoriteTrackRouter)

const port = 3001;

app.listen(port, () => {
  console.log("start!!!", port);
});
