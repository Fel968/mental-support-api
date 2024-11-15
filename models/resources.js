import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model, Types } from "mongoose";

export const videoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    video: { type: String }, 
    category: { type: String, enum: ['depression', 'anxiety', 'stress'] },
    postedBy: {type: Types.ObjectId, ref: 'User'}
},{
    timestamps: true
});

videoSchema.plugin(toJSON)

export const VideoModel = model('Video', videoSchema);



export const articleSchema = new Schema({
    title: { type: String },
    content: { type: String },
    description: {type: String},
    media: {type: String},
    category: { type: String, enum: ['depression', 'anxiety', 'stress'] },
    postedBy: {type: Types.ObjectId, ref: 'User'}
},{
    timestamps: true
});

articleSchema.plugin(toJSON)

export const articleModel = model('Article', articleSchema);



export const bookSchema = new Schema({
    title: { type: String },
    description: { type: String },
    file: {type: String},
    category: { type: String, enum: ['depression', 'anxiety', 'stress'] },
    postedBy: {type: Types.ObjectId, ref: 'User'}
},{
    timestamps: true
});

bookSchema.plugin(toJSON)

export const bookModel = model('Book', bookSchema);
