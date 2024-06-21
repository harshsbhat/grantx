import mongoose from 'mongoose';

const APIKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const APIKey = mongoose.models.APIKey || mongoose.model('APIKey', APIKeySchema);

export default APIKey;
