import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const moodSchema = new Schema({
    emoji: { type: String },
    entry: { type: String },
    postedBy: { type: Types.ObjectId, ref: 'User', required: true },
    sharedWithId: { type: Types.ObjectId, ref: 'User', default: null }, 
    chatId: { type: Types.ObjectId, ref: 'Chat', default: null }
}, { timestamps: true });

moodSchema.plugin(toJSON);

export const moodModel = model('Mood', moodSchema);
