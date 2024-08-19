import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectionToMongoDb } from "./utils/db.js";
import authRouter from "./router/auth.js";
import moviesRouter from "./router/movies.js";

async function init() {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  try {
    await connectionToMongoDb();
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }

  const port = process.env.PORT || 4000;

  app.use("/api", authRouter);
  app.use("/api", moviesRouter);
  app.get("/", (req, res) => {
    res.send("test");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found endpoint");
  });

  app.listen(port, async () => {
    console.log(`Server is running at ${port}`);
  });
}

init();
