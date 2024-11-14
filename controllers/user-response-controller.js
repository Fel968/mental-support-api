import { responseModel } from "../models/user-response-model.js";
import { userModel } from "../models/user-models.js";
import { responseValidator } from "../validators/response-validator.js";
import { assessmentModel } from "../models/assessment-model.js";


export const postResponse = async (req, res, next) => {
    try {
        // Validate the request body
        const { error, value } = responseValidator.validate(req.body);

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        const { question, response, category } = value;
        const applicantId = req.auth.id;

        // Ensure `question` is an ObjectId reference
        const existingQuestion = await assessmentModel.findOne({ _id: question });
        
        if (!existingQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Create response in the database
        await responseModel.create({
            question: existingQuestion._id,
            applicant: applicantId,
            response,
            category,
        });

        res.status(201).json('Response submitted');
    } catch (error) {
        next(error);
    }
};



// Get responses for admin
export const getAllResponses = async (req, res, next) => {
    try {
        const responses = await responseModel.find().populate('applicant', 'userName email').populate({path: 'question', select: 'question'} );
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

//Notification that says: Your status has been updated to {status}, kindly provide your age and a little info about yourself, so that users can reach out to you.