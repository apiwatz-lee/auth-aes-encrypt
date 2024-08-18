import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  validateSignUpPayload,
  validateUsername,
  validatePassword,
} from "../middlewares/auth.validation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateSignUpPayload,
  validateUsername,
  validatePassword,
  register
);

authRouter.post("/login", login);

export default authRouter;
