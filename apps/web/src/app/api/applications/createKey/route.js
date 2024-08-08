import dbConnect from '../../../utils/dbConnect';
import APIKey from '../../../models/APIkey';
import Application from '../../../models/Application';
import { generateAESKey } from '@/app/utils/generateKeys';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    try {
        const { appId, name, role, rateLimit, requestWindowMs } = await req.json();

        // Find the application by appId
        const application = await Application.findById(appId);

        if (!application) {
            return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
        }

        // Determine if rate limiting should be applied
        const isUnlimited = rateLimit === null;

        // Generate the key and salt
        const { key, salt } = generateAESKey();

        const apiKey = new APIKey({
            key,
            salt,
            application: application._id,
            name: name,
            role: role,
            requestLimit: isUnlimited ? null : rateLimit,
            requestWindowMs: isUnlimited ? null : requestWindowMs,
            isUnlimited,
        });

        await apiKey.save();

        return NextResponse.json({ success: true, apiKey }, { status: 201 });
    } catch (error) {
        console.error('Error creating API key:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ success: false, error: `Method Not Allowed` }, { status: 405 });
}
