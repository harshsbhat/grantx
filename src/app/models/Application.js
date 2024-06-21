import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    apiKeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'APIKey',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

ApplicationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

export default Application;
