import { encryptData } from "../utils/aes.js";
import { comparePassword, findUsername } from "../utils/auth.js";
import { db } from "../utils/db.js";

export const compareUsernameLogin = async (req, res, next) => {
  try {
    const username = { username: encryptData(req.body.username) };
    const user = await findUsername(db, username);

    if (!user) {
      return res.status(404).json({ message: "account not found" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const comparePasswordLogin = async (req, res, next) => {
  try {
    const username = { username: encryptData(req.body.username) };
    const user = await findUsername(db, username);
    const verifyPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "username or password is invalid" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
