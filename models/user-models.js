import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    userName: {type: String},
    fullName: {type: String},
    email: {type: String, email: true, required: true, unique: true},
    phone: {type: String},
    password: {type: String, required: true},
    profilePicture: {type: String},
},{
    timestamps: true
});

userSchema.plugin(toJSON);

export const userModel = model('User', userSchema);