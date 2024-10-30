import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userModel } from "../models/user-models";
import { registerUserValidator } from "../validators/user-validator";

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
