import Joi from "joi";

export const validatePostMood = Joi.object({
    emoji: Joi.string(),
    entry: Joi.string(),
    sharedWith: Joi.string().optional().allow(null)
});

