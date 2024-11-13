import { responseModel } from "../models/user-response-model.js";
import { userModel } from "../models/user-models.js";

export const postResponse = async (req, res, next) => {
    try {
        // I need a validator for this endpoint
        const { questionId, response, category } = req.body;
        const applicantId = req.auth.id; 

        await responseModel.create({
            question: questionId,
            applicant: applicantId,
            response,
            category
        });

        res.status(201).json('Response submitted');
    } catch (error) {
        next();
    }
};


// Get responses for admin
export const getAllResponses = async (req, res, next) => {
    try {
        const responses = await responseModel.find().populate('applicant', 'name email').populate('question', 'question');
        res.status(200).json(responses);
    } catch (error) {
        next();
    }
};

// do we need a get for one response??  Might be useful to both users and admin.

// I need delete response for admin


export const updateAssessmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        // const { responseId } = req.params; 

        const response = await responseModel.findOneAndUpdate(  { _id: req.params.id },  { status },         
            { new: true }       
        );

        if (!response) {
            return res.status(404).json({ error: "Response with the given ID was not found." });
        }

        const user = await userModel.findById(response.applicant);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Approve the user as a peer therapist
        if (status === 'approved') {
            user.role = 'peer-therapist';
            user.isApproved = true;
        } else {
            user.role = 'user';
            user.isApproved = false;
        }

        await user.save();

        res.status(200).json({
            message: `User status updated to ${status}`,
            userRole: user.role,
            isApproved: user.isApproved})

    } catch (error) {
        next(error);
    }
};
