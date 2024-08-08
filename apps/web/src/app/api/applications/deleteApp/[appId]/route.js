import dbConnect from '../../../../utils/dbConnect';
import Application from '../../../../models/Application';
import APIKey from '../../../../models/APIkey';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    await dbConnect();

    try {
        const { appId } = params;

        // Find the application by appId
        const application = await Application.findById(appId);

        if (!application) {
            return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
        }

        // Delete all associated API keys
        await APIKey.deleteMany({ application: appId });

        // Delete the application
        await Application.findByIdAndDelete(appId);

        return NextResponse.json({ success: true, message: 'Application and associated API keys deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting application and API keys:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
