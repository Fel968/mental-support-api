import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userModel } from "../models/user-models.js";
import { registerUserValidator, loginUserValidator, updateUserValidator } from "../validators/user-validator.js";

export const registerUser = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // check if user already exists
        const user = await userModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists');
        }

        // hash password
        const hashPassword = bcrypt.hashSync(value.password, 10);

        // save to database
        await userModel.create({
            ...value,
            password: hashPassword
        });

        res.status(201).json('User Registered!');

    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // find a user with identifier
        const user = await userModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist');
        }

        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!');
        }

        // Sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        // Respond to request
        res.json({
            message: 'User Logged In!',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

// Get User Profile
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await userModel
            .findById(req.auth.id)
            .select({ password: false });

        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const userProfileUpdate = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = updateUserValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }

        // Update user
        await userModel.findByIdAndUpdate(req.auth.id, value);
        // Respond to request
        res.json('User profile updated');
    } catch (error) {
        next(error);
    }
}

