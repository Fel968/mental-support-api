import { bookModel } from "../models/resources.js";
import { validatePostBook } from "../validators/resource-validator.js";

export const postBook= async (req, res, next) => {
    try {
        const { error, value } = validatePostBook.validate({
            ...req.body, file: req.file?.filename
        });

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        const { title, description, file, category } = value;
        const postedBy = req.auth.id;

        await bookModel.create({ title, description, file, category, postedBy })

        res.status(201).json('Book Posted');
    } catch (error) {
        next(error);
    }
};

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await bookModel.find().populate('postedBy', 'userName');
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

export const getSingleBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id).populate('postedBy', 'userName');
        if (!book) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};
