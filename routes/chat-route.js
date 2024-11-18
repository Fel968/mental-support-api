import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getOrCreateChat } from "../controllers/chat-controller";

export const chatRouter = Router();

chatRouter.get('/chat/:therapistId', isAuthenticated, getOrCreateChat); // Create or get chat
