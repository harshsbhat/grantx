import dbConnect from '../../../../utils/dbConnect';
import APIKey from '../../../../models/APIkey';
import { verifyRootKey } from '../../../../utils/verifyRootKey';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    try {
        const { keyId, name, role, rateLimit, requestWindowMs, rootKey } = await req.json();
        const { valid, error } = await verifyRootKey(rootKey);
        
        if (!valid) {
            return NextResponse.json({ success: false, error }, { status: error === 'Invalid root key' ? 401 : 500 });
        }

        const application = await APIKey.findById(keyId);

        if (!application) {
            return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
        }

        let apiKey = await APIKey.findById(keyId);

        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'API Key not found' }, { status: 404 });
        }

        // Update API key properties
        apiKey.name = name;
        apiKey.role = role;
        apiKey.requestLimit = rateLimit === null ? null : rateLimit;
        apiKey.requestWindowMs = rateLimit === null ? null : requestWindowMs;
        apiKey.isUnlimited = rateLimit === null;

        // Save the updated API key
        await apiKey.save();

        return NextResponse.json({ success: true, apiKey }, { status: 200 });
    } catch (error) {
        console.error('Error updating API key:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

