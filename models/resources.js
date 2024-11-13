const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['depression', 'anxiety', 'mindfulness'] },
    resourceType: { type: String, enum: ['article', 'video', 'document'], required: true },
    article: { type: String },
    video: { type: String, duration: Number },
    document: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    source: { type: String, default: 'internal' },
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
