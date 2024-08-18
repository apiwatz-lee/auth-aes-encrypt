import crypto from "crypto";

const aesKey = process.env.AES_KEY;
const aesIv = process.env.AES_IV;

export const encryptData = (data) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, aesIv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptData = (data) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, aesIv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
