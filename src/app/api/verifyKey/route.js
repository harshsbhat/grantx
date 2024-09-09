import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import APIKey from '../../models/APIkey';
import { verifyAESKey } from '../../utils/verifyKeys'; // Adjust the path as needed

function getClientIP(req) {
    const xForwardedFor = req.headers.get('x-forwarded-for');
    if (xForwardedFor) {
        const ipAddresses = xForwardedFor.split(',').map(ip => ip.trim());
        const clientIP = ipAddresses[0];
        if (clientIP.startsWith('::ffff:')) {
            return clientIP.substring(7);
        }
        return clientIP;
    }
    const remoteAddr = req.headers.get('remote-addr');
    if (remoteAddr && remoteAddr.startsWith('::ffff:')) {
        return remoteAddr.substring(7);
    }
    return remoteAddr || '';
}

export async function POST(req) {
    await dbConnect();

    const { apiKey } = await req.json();

    try {
        const keyRecord = await APIKey.findOne({ key: apiKey });
        const clientIP = getClientIP(req);
        if (!keyRecord) {
            return NextResponse.json({ valid: false, error: 'API key not found' }, { status: 404 });
        }
        if (keyRecord.whitelistedIPs.length > 0) {
            if (!keyRecord.whitelistedIPs.includes(clientIP)){
                return NextResponse.json({ valid: false, error: 'IP not whitelisted' }, { status: 403 });
            }
        }
        if (!verifyAESKey(apiKey, keyRecord.salt)) {
            return NextResponse.json({ valid: false, error: 'Invalid API key' }, { status: 400 });
        }

        keyRecord.resetRequestCountIfNeeded();

        const currentTime = new Date();
        if (keyRecord.isUnlimited || keyRecord.requestCount < keyRecord.requestLimit) {
            keyRecord.requestCount += 1;
            keyRecord.lastRequestTime = currentTime;
            await keyRecord.save();

            return NextResponse.json({
                valid: true,
                message: 'API key verified',
                name: keyRecord.name,
                role: keyRecord.role,
            });
        } else {
            return NextResponse.json({ valid: false, error: 'Rate limit exceeded' }, { status: 429 });
        }
    } catch (error) {
        console.error('Error verifying API key:', error);
        return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ valid: false, error: 'Method Not Allowed' }, { status: 405 });
}
