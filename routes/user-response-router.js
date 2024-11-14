import { Router } from "express";
import { postResponse, getAllResponses } from "../controllers/user-response-controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

export const responseRouter = Router();

responseRouter.post('/user/assessment/response', isAuthenticated, postResponse)

responseRouter.get('/assessment/responses', isAuthenticated, isAdmin, getAllResponses); 
