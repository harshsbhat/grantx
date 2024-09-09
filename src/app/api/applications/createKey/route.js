import dbConnect from '../../../utils/dbConnect';
import APIKey from '../../../models/APIkey';
import Application from '../../../models/Application';
import { generateAESKey } from '../../../utils/generateKeys';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    try {
        const { appId, name, role, rateLimit, requestWindowMs, whitelistedIPs } = await req.json();

        console.log('Received data:', { appId, name, role, rateLimit, requestWindowMs, whitelistedIPs });
        console.log(whitelistedIPs)

        const application = await Application.findById(appId);

        if (!application) {
            return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
        }

        const isUnlimited = rateLimit === null;

        const { key, salt } = generateAESKey();

        // Debugging: Log the data before saving
        console.log('Saving API key with data:', {
            key,
            salt,
            application: application._id,
            name: name || null,
            role: role || null,
            requestLimit: isUnlimited ? null : rateLimit,
            requestWindowMs: isUnlimited ? null : requestWindowMs,
            isUnlimited,
            whitelistedIPs: whitelistedIPs || [],
        });

        const apiKey = new APIKey({
            key,
            salt,
            application: application._id,
            name: name || null,
            role: role || null,
            requestLimit: isUnlimited ? null : rateLimit,
            requestWindowMs: isUnlimited ? null : requestWindowMs,
            isUnlimited,
            whitelistedIPs: whitelistedIPs || [], 
        });

        await apiKey.save();

        // Debugging: Log the saved API key
        console.log('Saved API key:', apiKey);

        return NextResponse.json({ success: true, apiKey }, { status: 201 });
    } catch (error) {
        console.error('Error creating API key:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ success: false, error: `Method Not Allowed` }, { status: 405 });
}
