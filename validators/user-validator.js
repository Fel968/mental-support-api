import Joi from "joi";

export const registerUserValidator = Joi.object({
    userName: Joi.string(),
    fullName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'peer-counsellor', 'counsellor', 'admin'),
    phone: Joi.string()
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
    userName: Joi.string(),
    fullName: Joi.string(),
    phone: Joi.string(),
    password: Joi.string(),
    role: Joi.string().valid('user', 'peer-counsellor', 'counsellor'),
    profilePicture: Joi.string()
});
