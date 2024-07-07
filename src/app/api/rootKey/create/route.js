    // pages/api/rootkey/create.js

    import dbConnect from '../../../utils/dbConnect';
    import RootKey from '../../../models/Rootkey'; 
    import { generateAESKey } from '@/app/utils/generateRootkey';
    import { NextResponse } from 'next/server';

    export async function POST(req) {
        await dbConnect();

        try {
            const { userId } = await req.json();
            const name = `RootKey_${userId}`;

            // Create a new root key instance
            const newRootKey = await RootKey.create({
                key: generateAESKey(), 
                userId,
                name,
            });

            return NextResponse.json({ success: true, rootKey: newRootKey }, { status: 201 });
        } catch (error) {
            console.error('Error creating root key:', error);
            return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
        }
    }

    export async function OPTIONS() {
        return NextResponse.json({ success: false, error: `Method Not Allowed` }, { status: 405 });
        }
