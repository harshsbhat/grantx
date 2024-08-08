import dbConnect from '../../../../utils/dbConnect';
import { NextResponse } from 'next/server';
import APIKey from '../../../../models/APIkey';

export async function GET(req) {
    const url = new URL(req.url);
    const path = url.pathname.split('/');
    const keyId = path[path.length - 1];

    await dbConnect();

    try {
        const keyDetails = await APIKey.findOne({ _id: keyId });

        if (!keyDetails) {
            return NextResponse.json({ success: false, error: 'Key not found' }, { status: 404 });
        }
        const {
            _id,
            key,
            application,
            name,
            role,
            requestCount,
            requestLimit,
            requestWindowMs,
            isUnlimited,
            createdAt,
            requestWindowStart
        } = keyDetails;

        return NextResponse.json({
            success: true,
            keyDetails: {
                _id,
                key,
                application,
                name,
                role,
                requestCount,
                requestLimit,
                requestWindowMs,
                isUnlimited,
                createdAt,
                requestWindowStart
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching key details:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
