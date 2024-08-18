import validator from "validator";
import { db } from "../utils/db.js";
import { encryptData } from "../utils/aes.js";

export const validateSignUpPayload = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    const encryptUsername = encryptData(username);
    const findUsername = await db
      .collection("users")
      .findOne({ username: encryptUsername });

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (findUsername) {
      return res.status(500).json({ message: "Username is already taken" });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Register weng wrong :${error.message}` });
  }
};

export const validateUsername = (req, res, next) => {
  const { username } = req.body;
  const isEmail = validator.isEmail(username);
  const isPhoneNumber = validator.isMobilePhone(username, "th-TH");

  if (!isEmail && !isPhoneNumber) {
    return res.status(400).json({ message: "Invalid email or phone number" });
  }

  next();
};

export const validatePassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const minLength = 6;
  const maxLength = 40;

  if (!validator.isLength(password, { min: minLength, max: maxLength })) {
    return res
      .status(400)
      .json({ message: "Password must be between 6 and 40 characters" });
  }

  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one uppercase letter.",
    });
  }

  if (!/[a-z]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one lowercase letter.",
    });
  }

  if (!/[0-9]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one number." });
  }

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirm password does not match" });
  }

  next();
};
