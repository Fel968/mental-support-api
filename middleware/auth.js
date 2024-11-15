import { expressjwt } from "express-jwt";
import { userModel } from "../models/user-models.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"]
});


export const isAdmin = async (req, res, next) => {
    try {
        // Fetch the user from the database using req.auth.id
        const user = await userModel.findById(req.auth.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user's role is admin
        if (user.role === 'admin') {
            next();
        }

        else {
            res.status(403).json('Action not allowed!');  
        }

    } catch (error) {
        next(error);
    }
};



export const isTherapist = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.auth.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role === 'peer-therapist' || user.role === 'professional-therapist' || user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Action not allowed! Only therapists can perform this action.'});
        }

    } catch (error) {
        next(error);
    }
};
