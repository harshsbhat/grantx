import dbConnect from '../../../../utils/dbConnect';
import Application from '../../../../models/Application';
import APIKey from '../../../../models/APIkey';
import { verifyRootKey } from '../../../../utils/verifyRootKey';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();

    try {
        const { rootKey, appId } = await req.json()
        console.log(   { rootKey, appId } )
        const { valid, error } = await verifyRootKey(rootKey);
        if (!valid) {
            return NextResponse.json({ success: false, error }, { status: error === 'Invalid root key' ? 401 : 500 });
        }

        const application = await Application.findById(appId);

        if (!application) {
            return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
        }

        await APIKey.deleteMany({ application: appId });

        await Application.findByIdAndDelete(appId);

        return NextResponse.json({ success: true, message: 'Application and associated API keys deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting application and API keys:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

<<<<<<< HEAD
=======
export async function OPTIONS() {
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
>>>>>>> e50b67abe70f27aa1f17cb97efb76a08df41cef2
