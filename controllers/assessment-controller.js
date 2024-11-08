import { assessmentModel } from "../models/assessment-model.js";

export const postAssessmentQuestions = async (req, res, next) => {
    try {
        const { question, adminEmail } = req.body;

        await assessmentModel.create({question, adminEmail})

        res.status(201).json("Assessment posted successfully!");

    } catch (error) {
        next(error);
    }
}

export const getAssessmentQuestions = async (req, res, next) => {

    try {

        const questions = await assessmentModel.find({}).select('question adminEmail');
 
        // return response
        res.status(200).json(questions);

    } catch (error) {
        next(error)
    }
};