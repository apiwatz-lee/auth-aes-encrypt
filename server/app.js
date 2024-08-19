import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectionToMongoDb } from "./utils/db.js";
import cloudinary from "cloudinary";
import authRouter from "./router/auth.js";

async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  const port = process.env.PORT || 4000;

  app.use("/auth", authRouter);
  app.get("/", (req, res) => {
    res.send("test");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found endpoint");
  });

  app.listen(port, async () => {
    await connectionToMongoDb();
    console.log(`Server is running at ${port}`);
  });
}

init();
