import { verifyRootKey } from '@/app/utils/verifyRootKey';
import Application from '@/app/models/Application';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, rootKey } = await req.json();
        const { valid, userId, error } = await verifyRootKey(rootKey);

        if (!valid) {
            return NextResponse.json({ success: false, error }, { status: error === 'Invalid root key' ? 401 : 500 });
        }
        const newApplication = await Application.create({ userId, name });

        return NextResponse.json({ success: true, application: newApplication }, { status: 201 });
    } catch (error) {
        console.error('Error creating application:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

<<<<<<< HEAD
=======
export async function OPTIONS() {
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
>>>>>>> e50b67abe70f27aa1f17cb97efb76a08df41cef2
