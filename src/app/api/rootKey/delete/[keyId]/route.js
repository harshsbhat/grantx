// pages/api/rootKey/delete/[id].js
import dbConnect from '../../../../utils/dbConnect';
import RootKey from '../../../../models/Rootkey';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    await dbConnect();

    try {
        const { keyId } = params;
        if (!keyId) {
            return NextResponse.json({ success: false, error: 'Root Key ID not provided' }, { status: 400 });
        }

        await RootKey.findOneAndDelete({ key: keyId });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting root key:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
