import { Router } from "express";
import { getAllSharedMoods, getUserWeeklyMoodLogs, getWeeklyMoodLogs, postMood } from "../controllers/mood-controller.js";
import { isAuthenticated, isTherapist } from "../middleware/auth.js";

export const moodRouter = Router();

moodRouter.post('/mood', isAuthenticated, postMood)

moodRouter.get('/moodlogs/:clientId', isAuthenticated, isTherapist, getWeeklyMoodLogs)

moodRouter.get('/moodlog/me', isAuthenticated, getUserWeeklyMoodLogs)

moodRouter.get('/moods/shared', isAuthenticated, isTherapist, getAllSharedMoods);
