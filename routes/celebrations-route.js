import { Router } from "express";
import { getAchievements, likeAchievement, postAchievement } from "../controllers/celebrations-controller.js";
import { isAuthenticated } from "../middleware/auth.js";

export const celebrationsRouter = Router();

celebrationsRouter.post('/celebration', isAuthenticated, postAchievement);

celebrationsRouter.get('/celebrations', isAuthenticated, getAchievements);

celebrationsRouter.post('/:achievementId/like', isAuthenticated, likeAchievement);

