import dbConnect from '../../../../utils/dbConnect';
import { NextResponse } from 'next/server';
import APIKey from '../../../../models/APIkey';
import { verifyRootKey } from '../../../../utils/verifyRootKey';

export async function POST(req) {
    const { keyId, rootKey } = await req.json();
    const { valid, error } = await verifyRootKey(rootKey);
        if (!valid) {
            return NextResponse.json({ success: false, error }, { status: error === 'Invalid root key' ? 401 : 500 });
        }

    await dbConnect();

    try {
        const result = await APIKey.deleteOne({ _id: keyId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'API key not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'API key deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting API key:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
