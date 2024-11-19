import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createMessageInChat, getChat } from "../controllers/chat-controller.js";


export const chatRouter = Router();

chatRouter.get('/chat/:recipientId', isAuthenticated, getChat); // Create or get chat

chatRouter.post('/chat/:therapistId', isAuthenticated, createMessageInChat); // Create or get chat

