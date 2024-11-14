import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user-route.js";
import { assessmentRouter } from "./routes/assessment-questions-route.js";
import { responseRouter } from "./routes/user-response-router.js";
import { certificateRouter } from "./routes/certification-route.js";
import { approvedTherapistRouter } from "./routes/approved-therapists-routes.js";

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(assessmentRouter);
app.use(responseRouter);
app.use(certificateRouter)
app.use(approvedTherapistRouter)

app.listen(3005, () => {
    console.log('App is listening on port 3005')
});