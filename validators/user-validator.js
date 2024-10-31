import Joi from "joi";

export const registerUserValidator = Joi.object({
    userName: Joi.string(),
    fullName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    userType: Joi.string().valid('user', 'peer-counsellor', 'counsellor'),
    phone: Joi.string()
});

export const updateUserValidator = Joi.object({
    userName: Joi.string(),
    fullName: Joi.string(),
    password: Joi.string(),
    userType: Joi.string().valid('user', 'peer-counsellor', 'counsellor'),
    profilePicture: Joi.string(),
    phone: Joi.string()
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});