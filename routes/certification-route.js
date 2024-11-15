import { Router } from "express";
import {isAuthenticated, isAdmin } from "../middleware/auth.js";

import { postCertificate, getAllCertificates, updateCertificateStatus } from "../controllers/certification-controller.js";  
import { certificateUpload } from "../middleware/files.js";

export const certificateRouter = Router();

certificateRouter.post('/therapist/certification', isAuthenticated,  certificateUpload.single('certificates'), postCertificate)
certificateRouter.get('/therapist/certification', isAuthenticated, isAdmin, getAllCertificates)
certificateRouter.patch('/therapist/:id',isAuthenticated, isAdmin, updateCertificateStatus)

