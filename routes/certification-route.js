import { Router } from "express";
import {isAuthenticated, isAdmin } from "../middleware/auth.js";

import { postCertificate, getAllCertificates, updateCertificateStatus } from "../controllers/certification-controller.js";  

export const certificateRouter = Router();

certificateRouter.post('/therapist/certification', isAuthenticated, postCertificate)
certificateRouter.get('/therapist/certification', isAdmin, getAllCertificates)
certificateRouter.patch('/therapist/:id', isAdmin, updateCertificateStatus)

