import Joi from "joi";

export const resourceValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  category: Joi.string().valid('depression', 'anxiety', 'mindfulness'),
  resourceType: Joi.string().valid('article', 'video', 'document'),
  article: Joi.string(),
  video: Joi.string(),
  document: Joi.string()
});
