import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGO_CONNECTION;

export const client = new MongoClient(connectionString, {
    useUnifiedTopology: true,
  });

export const db = client.db("xsurface");