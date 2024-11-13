import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const certificateSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true }, 
    certificates: [{ type: String, required: true }], 
    yearsOfPractice: { type: Number, required: true }, 
    fieldOfExpertise: { type: String, required: true }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } 
}, { timestamps: true });

certificateSchema.plugin(toJSON);

export const certificateModel = model('Certificate', certificateSchema);
