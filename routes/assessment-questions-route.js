import { Router } from "express";
import { getAssessmentQuestions, postAssessmentQuestions } from "../controllers/assessment-controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

export const assessmentRouter = Router()

assessmentRouter.post('/admin/assessment', isAuthenticated, isAdmin, postAssessmentQuestions)

assessmentRouter.get('/user/assessment', isAuthenticated, getAssessmentQuestions) 


