import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decryptData } from "./aes.js";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const findUsername = async (db, username) => {
  return await db.collection("users").findOne(username);
};

export const comparePassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
};

export const generateToken = async (user) => {
  return await jwt.sign(
    {
      userId: user._id,
      firstname: decryptData(user.account_name),
      lastname: user.lastname,
      role: "user",
    },
    process.env.SECRET_KEY,
    { expiresIn: "90000" }
  );
};
