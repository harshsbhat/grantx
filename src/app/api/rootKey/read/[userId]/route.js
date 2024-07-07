// pages/api/rootkeys/[userId].js
import dbConnect from '../../../../utils/dbConnect';
import RootKey from '../../../../models/Rootkey';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await dbConnect();

    try {
        const { userId } = params;
        if (!userId) {
            return NextResponse.json({ success: false, error: 'User ID not provided' }, { status: 400 });
        }

        const rootKeys = await RootKey.find({ userId }).exec();

        return NextResponse.json({ success: true, data: rootKeys }, { status: 200 });
    } catch (error) {
        console.error('Error fetching root keys:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
