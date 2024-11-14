import { Router } from "express";
import { getAllPeerTherapists, getAllProTherapists, getSinglePeerTherapist, getSingleProTherapist } from "../controllers/approved-therapists-controller.js";

export const approvedTherapistRouter = Router();

approvedTherapistRouter.get('/peer-therapist/:id', getSinglePeerTherapist)

approvedTherapistRouter.get('/peer-therapists', getAllPeerTherapists)

approvedTherapistRouter.get('/professional-therapist/:id', getSingleProTherapist)

approvedTherapistRouter.get('/professional-therapists', getAllProTherapists)


