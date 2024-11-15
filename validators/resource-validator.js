import Joi from "joi";

export const validatePostVideo = Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        video: Joi.string(),
        category: Joi.string().valid('depression', 'anxiety', 'stress').required()
    });


    export const validatePostArticle = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      content: Joi.string(),
      media: Joi.string(),
      category: Joi.string().valid('depression', 'anxiety', 'stress').required()
  });

  

  export const validatePostBook= Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    file: Joi.string(),
    category: Joi.string().valid('depression', 'anxiety', 'stress').required()
  });