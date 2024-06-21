import dbConnect from '../../../utils/dbConnect';
import Application from '../../../models/Application';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    try {
        const userId = req.userId; // Ensure req.user is properly set

        const applications = await Application.find({ userId }).exec();

        return NextResponse.json({ success: true, data: applications }, { status: 200 });
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
