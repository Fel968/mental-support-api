import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

export const responseSchema = new Schema({
    question: {type: Types.ObjectId, ref: 'Assessment'},
    applicant: {type: Types.ObjectId, ref: 'User'},
    response: [{type: String, required: true}],
    category: [{type: String, enum: ['depression', 'anxiety', 'mindfulness', 'marriage', 'stress']}],
    status: {type: String, default: 'pending', enum: ['approved', 'pending', 'rejected' ]}
},{
    timestamps: true
});

responseSchema.plugin(toJSON);

export const responseModel = model('Response', responseSchema);