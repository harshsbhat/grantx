import APIKey from '../../../../models/APIkey';
import dbConnect from '../../../../utils/dbConnect';    
import { NextResponse } from 'next/server';

export async function GET(req) {
    const url = new URL(req.url); 
    const path = url.pathname.split('/');
    const appId = path[path.length - 2]; 

    await dbConnect();

    try {
        const apiKeys = await APIKey.find({ application: appId });

        if (!apiKeys || apiKeys.length === 0) {
            return NextResponse.json({ success: false, error: 'No API keys found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, apiKeys }, { status: 200 });
    } catch (error) {
        console.error('Error fetching API keys:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
