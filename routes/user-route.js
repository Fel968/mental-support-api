import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user-controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { userProfileUpload } from "../middleware/files.js";

export const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser)

