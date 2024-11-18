import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";


const messageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

messageSchema.plugin(toJSON)


const chatSchema = new Schema({
    participants: [
        {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }, 
}, { timestamps: true });

chatSchema.plugin(toJSON)


export const chatModel = model('Chat', chatSchema);

