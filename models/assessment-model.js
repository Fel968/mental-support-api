import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const assessmentSchema = new Schema({
    question: [{ type: String }],
    admin: {type: Types.ObjectId, ref: 'User'},
});

assessmentSchema.plugin(toJSON);

export const assessmentModel = model('Assessment', assessmentSchema);
