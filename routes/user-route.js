import { Router } from "express";
import { loginUser, registerUser, getUserProfile, userProfileUpdate } from "../controllers/user-controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { userProfileUpload } from "../middleware/files.js";

export const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser)

userRouter.patch('/users/me', isAuthenticated, userProfileUpdate);//this is for single user/ logged in user

userRouter.get('/users/me', isAuthenticated, userProfileUpload.single('profilePicture'), getUserProfile);//this is for single user/ logged in user

// add get user profile for all users?? we want to get only peer therapists or pro therapist

