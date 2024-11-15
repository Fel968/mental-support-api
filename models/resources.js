import { Schema, model } from "mongoose";

export const videoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    contentUrl: { type: String }, // URL to the video
    category: { type: String, enum: ['depression', 'anxiety', 'stress'] }
},{
    timestamps: true
});
export const VideoModel = model('Video', videoSchema);
