import { Router } from "express";
import { loginUser, registerUser, getUserProfile, userProfileUpdate, getAllUserProfile } from "../controllers/user-controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { userProfileUpload } from "../middleware/files.js";

export const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser)

userRouter.get('/users',isAuthenticated, isAdmin,  getAllUserProfile);

userRouter.patch('/users/me', isAuthenticated, userProfileUpload.single('profilePicture'), userProfileUpdate);   

userRouter.get('/users/me', isAuthenticated,  getUserProfile);


