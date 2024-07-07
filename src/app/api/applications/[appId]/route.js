import dbConnect from '../../../utils/dbConnect';
import Application from '../../../models/Application';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const url = new URL(req.url);
    const path = url.pathname.split('/');
    const appId = path[path.length - 1];

    await dbConnect();

    try {
        const application = await Application.findById(appId);

        if (!application) {
            return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
        }

        const { _id, name, apiKeys, createdAt } = application;
        return NextResponse.json({ success: true, application: { _id, name, apiKeys, createdAt } }, { status: 200 });
    } catch (error) {
        console.error('Error fetching application:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
