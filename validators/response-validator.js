import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const responseValidator = Joi.object({
    question: Joi.string().pattern(objectIdPattern),
    response: Joi.string().required(),
    category: Joi.string().valid('depression', 'anxiety', 'mindfulness', 'marriage', 'stress'),
    status: Joi.string().valid('approved', 'pending', 'rejected').default('pending')
});
