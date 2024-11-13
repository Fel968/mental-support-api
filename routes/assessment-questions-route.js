import { Router } from "express";
import { getAssessmentQuestions, postAssessmentQuestions } from "../controllers/assessment-controller.js";
import { updateAssessmentStatus } from "../controllers/user-response-controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

export const assessmentRouter = Router()

assessmentRouter.post('/admin/assessment', isAuthenticated, isAdmin, postAssessmentQuestions)

assessmentRouter.get('/user/assessment', isAuthenticated, getAssessmentQuestions) 

assessmentRouter.patch('/assessment/:id',isAuthenticated, isAdmin, updateAssessmentStatus);



