import dbConnect from '../../../utils/dbConnect';
import Application from '../../../models/Application';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {
        const { userId, name } = await req.json();
        const newApplication = await Application.create({ userId, name });

        return NextResponse.json({ success: true, application: newApplication }, { status: 201 });
    } catch (error) {
        console.error('Error creating application:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}