import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";
export const celebrationSchema = new Schema({
    postedBy: {type: Types.ObjectId, ref: "User" },
    content: {type: String},
    likes: { type: Number, default: 0 },
    likedBy: [{ type: Types.ObjectId, ref: "User" } ],
}, { timestamps: true });

celebrationSchema.plugin(toJSON);

export const celebrationModel = model("Celebrations", celebrationSchema);
