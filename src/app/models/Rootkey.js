import mongoose from 'mongoose';

const RootKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const RootKey = mongoose.models.RootKey || mongoose.model('RootKey', RootKeySchema);

export default RootKey;
