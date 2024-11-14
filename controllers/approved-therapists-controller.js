import { userModel } from "../models/user-models.js";

// Get a single peer therapist
export const getSinglePeerTherapist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const therapist = await userModel.findOne({ _id: id, role: 'peer-therapist' });

        if (!therapist) {
            return res.status(404).json('Therapist not found');
        }

        res.status(200).json(therapist);
    } catch (error) {
        next(error);
    }
};

export const getAllPeerTherapists = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}" } = req.query;
        const parsedFilter = JSON.parse(filter);
        const parsedSort = JSON.parse(sort);
        
        const therapists = await userModel
            .find({ ...parsedFilter, role: 'peer-therapist' })
            .sort(parsedSort);

        res.status(200).json(therapists);
    } catch (error) {
        next(error);
    }
};


export const getSingleProTherapist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const therapist = await userModel.findOne({ _id: id, role: 'professional-therapist' });

        if (!therapist) {
            return res.status(404).json('Therapist not found');
        }

        res.status(200).json(therapist);
    } catch (error) {
        next(error);
    }
};

export const getAllProTherapists = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}" } = req.query;
        const parsedFilter = JSON.parse(filter);
        const parsedSort = JSON.parse(sort);
        
        const therapists = await userModel
            .find({ ...parsedFilter, role: 'professional-therapist' })
            .sort(parsedSort);

        res.status(200).json(therapists);
    } catch (error) {
        next(error);
    }
};