import { articleModel } from "../models/resources.js";
import { validatePostArticle } from "../validators/resource-validator.js";

export const postArticle = async (req, res, next) => {
    try {
        const { error, value } = validatePostArticle.validate({
            ...req.body, media: req.file?.filename
        });

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        const { title, content, description, media, category } = value;
        const postedBy = req.auth.id;

        await articleModel.create({ title, content, description, media, category, postedBy })

        res.status(201).json('Article Posted');
    } catch (error) {
        next(error);
    }
};

export const getAllArticles = async (req, res, next) => {
    try {
        const articles = await articleModel.find().populate('postedBy', 'userName');
        res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
};

export const getSingleArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await articleModel.findById(id).populate('postedBy', 'userName');
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};
