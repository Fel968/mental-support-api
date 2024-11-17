import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";

export const chatSchema = new Schema({
    participants: [{ type: Types.ObjectId, ref: 'User' }],
    messages: [{
        sender: { type: Types.ObjectId, ref: 'User' },
        text: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
    moodLogs: [{ type: Types.ObjectId, ref: 'Mood' }] 
}, { timestamps: true });

chatSchema.plugin(toJSON)

export const chatModel = model('Chat', chatSchema);
