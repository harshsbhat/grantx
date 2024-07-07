// models/Application.js

import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    apiKeys: {
        type: [String],
        default: [], 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
