import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {type: String},
    fullName: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, enum: [peer-counsellor, user, counsellor]},
    profilePicture: {type: String},
    phone: {type: String}
},{
    timestamps: true
});

export const userModel = model('User', userSchema);