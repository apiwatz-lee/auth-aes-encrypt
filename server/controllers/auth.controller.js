import { db } from "../utils/db.js";
import {
  comparePassword,
  findUsername,
  generateToken,
  hashPassword,
} from "../utils/auth.js";
import { encryptData } from "../utils/aes.js";

export const register = async (req, res) => {
  try {
    const user = {
      username: encryptData(req.body.username),
      password: await hashPassword(req.body.password),
      created_at: new Date(),
    };

    const collection = db.collection("users");
    await collection.insertOne(user);

    return res.status(200).json({
      message: "user has been created successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: `Register weng wrong :${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const username = { username: encryptData(req.body.username) };
    const user = await findUsername(db, username);

    if (!user) {
      return res.status(404).json({ message: "account not found" });
    }

    const verifyPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (!verifyPassword) {
      return res
        .status(404)
        .json({ message: "username or password is invalid" });
    }

    if (user && verifyPassword) {
      const token = await generateToken(user);

      return res.status(200).json({
        message: "User login successfully",
        token,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: `Login went wrong :${error}` });
  }
};
