import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const assessmentSchema = new Schema({
    // applicant: { type: Types.ObjectId, ref: 'User' },
    question: [{ type: String }],
            // answer: { type: String, required: true }
    // userResponse: {type: String},
    // score: { type: Number },  
    admin: {type: Types.ObjectId, ref: 'User'},
    // adminEmail: {type: String},
    // status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

assessmentSchema.plugin(toJSON);

export const assessmentModel = model('Assessment', assessmentSchema);
