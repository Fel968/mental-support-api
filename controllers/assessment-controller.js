import { assessmentModel } from "../models/assessment-model.js";

export const postAssessmentQuestions = async (req, res, next) => {
    try {
        const { question } = req.body;
        const adminId = req.auth.id; 
        const assessment = await assessmentModel.create({
            question,
            admin: adminId,
        });

        res.status(201).json({ message: 'Assessment created', data: assessment });
    } catch (error) {
        next();
    }
};


export const getAssessmentQuestions = async (req, res, next) => {
    try {
        const assessments = await assessmentModel.find({}, 'question');
        res.status(200).json(assessments);
    } catch (error) {
        next();
    }
};