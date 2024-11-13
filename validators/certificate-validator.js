import Joi from "joi";

export const postCertificateValidator = Joi.object({
    certificate: Joi.string().required(),
    yearsOfPractice: Joi.number(),
    fieldOfExpertise: Joi.string()
});
