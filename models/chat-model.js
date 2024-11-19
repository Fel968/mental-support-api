import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";

const chatSchema = new Schema({
    participants: [
        {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    messages: [
        {
            sender: {
                type: Types.ObjectId,
                ref: 'User',
                required: true,
            },
            content: {
                type: String,
                required: true,
            }
            // read: {
            //     type: Boolean,
            //     default: false,
            // }
        }
    ]
}, { timestamps: true });

chatSchema.plugin(toJSON);

export const chatModel = model('Chat', chatSchema);
