import { VideoModel } from "../models/resources.js";
import { validatePostVideo } from "../validators/resource-validator.js";

export const postVideo = async (req, res, next) => {
    try {
        const { error, value } = validatePostVideo.validate({
            ...req.body, video: req.file?.filename
        });

        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        const { title, description, video, category } = value;
        const postedBy = req.auth.id;

        await VideoModel.create({ title, description, video, category, postedBy })

        res.status(201).json('Video Posted');
    } catch (error) {
        next(error);
    }
};

export const getAllVideos = async (req, res, next) => {
    try {
        const videos = await VideoModel.find().populate('postedBy', 'userName');
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
};


export const getSingleVideo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const video = await VideoModel.findById(id).populate('postedBy', 'userName');
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
};




