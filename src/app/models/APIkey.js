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
    name: {
        type: String,
        default: null, // Optional field
    },
    role: {
        type: String,
        default: null, // Optional field
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    requestCount: {
        type: Number,
        default: 0,
    },
    requestWindowStart: {
        type: Date,
        default: Date.now,
    },
    lastRequestTime: {
        type: Date,
        default: Date.now,
    },
    requestLimit: {
        type: Number,
        default: 100, 
    },
    requestWindowMs: {
        type: Number,
        default: 15 * 60 * 1000, 
    },
    isUnlimited: {
        type: Boolean,
        default: false, 
    },
    salt: {
        type: String,
        required: true,
    },
    whitelistedIPs: { 
        type: Array,
        default: [] 
    }
});

// Indexes to improve query performance
APIKeySchema.index({ key: 1 });
APIKeySchema.index({ application: 1 });

// Middleware to handle request count reset
APIKeySchema.methods.resetRequestCountIfNeeded = function() {
    const currentTime = new Date();
    const requestWindowEnd = new Date(this.requestWindowStart.getTime() + this.requestWindowMs);

    if (currentTime > requestWindowEnd) {
        this.requestWindowStart = currentTime;
        this.requestCount = 0;
    }
};


const APIKey = mongoose.models.APIKey || mongoose.model('APIKey', APIKeySchema);

export default APIKey;
