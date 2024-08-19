import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  validateSignUpPayload,
  validateUsername,
  validatePassword,
} from "../middlewares/register.validation.js";
import {
  compareUsernameLogin,
  comparePasswordLogin,
} from "../middlewares/login.validation.js";

const authRouter = Router();

authRouter.post(
  "/auth/register",
  validateSignUpPayload,
  validateUsername,
  validatePassword,
  register
);

authRouter.post(
  "/auth/login",
  compareUsernameLogin,
  comparePasswordLogin,
  login
);

export default authRouter;
