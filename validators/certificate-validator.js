import Joi from "joi";

export const postCertificateValidator = Joi.object({
    certificates: Joi.array().required(),
    yearsOfPractice: Joi.number(),
    fieldOfExpertise: Joi.string()
});
