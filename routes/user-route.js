import { Router } from "express";
import { registerUser } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post('/users/register', registerUser);

