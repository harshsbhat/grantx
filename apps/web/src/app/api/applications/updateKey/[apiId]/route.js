import dbConnect from '../../../../utils/dbConnect';
import APIKey from '../../../../models/APIkey';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    await dbConnect();

    try {
        const { apiId } = params;
        const { name, role, rateLimit, requestWindowMs } = await req.json();

        // Find the API key by ID
        const apiKey = await APIKey.findById(apiId);

        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'API Key not found' }, { status: 404 });
        }

        // Update the API key details
        apiKey.name = name || apiKey.name;
        apiKey.role = role || apiKey.role;
        apiKey.requestLimit = rateLimit === null ? null : rateLimit;
        apiKey.requestWindowMs = rateLimit === null ? null : requestWindowMs;
        apiKey.isUnlimited = rateLimit === null;

        await apiKey.save();

        return NextResponse.json({ success: true, updatedKeyDetails: apiKey }, { status: 200 });
    } catch (error) {
        console.error('Error updating API key:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
