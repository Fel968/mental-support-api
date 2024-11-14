const mongoose = require('mongoose');

export const resourceSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    category: { type: String, enum: ['depression', 'anxiety', 'mindfulness'] },
    resourceType: { type: String, enum: ['article', 'video', 'document'] },
    article: { type: String },
    video: { type: String, duration: Number },
    document: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    source: { type: String, default: 'FelJoy' },
}, { timestamps: true });

export const resourceModel = mongoose.model('Resource', resourceSchema);

export default Resource;
