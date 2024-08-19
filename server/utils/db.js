import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_URI;

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

export const connectionToMongoDb = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export const db = client.db("auth-aes-encrypt");
