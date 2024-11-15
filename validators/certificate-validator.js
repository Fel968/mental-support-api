import Joi from "joi";

export const postCertificateValidator = Joi.object({
    certificates: Joi.string().required(),
    yearsOfPractice: Joi.number(),
    category: Joi.string().valid('depression', 'anxiety', 'mindfulness', 'marriage', 'stress')
});
