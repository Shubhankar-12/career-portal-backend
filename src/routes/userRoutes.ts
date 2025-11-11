import express from "express";
import { getByIdUserController } from "../use_cases/user/get_by_id";
import { loginUserController } from "../use_cases/auth/login";
import { authenticate } from "../helpers/AuthMiddleware";
export const userRouter = express.Router();

userRouter.get("/", authenticate, getByIdUserController.execute());
