import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createMessageInChat, getAllUserChats, getChat } from "../controllers/chat-controller.js";


export const chatRouter = Router();

chatRouter.get('/chat/:senderId', isAuthenticated, getChat); 

chatRouter.post('/chat/:recipientId', isAuthenticated, createMessageInChat); 

chatRouter.get('/chat-sessions', isAuthenticated, getAllUserChats); // Create or get chat


