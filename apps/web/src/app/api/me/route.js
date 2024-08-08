import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

const secret = process.env.JWT_SECRET;

export async function GET(req) {
    await dbConnect();

    // Retrieve cookies from the request
    const cookieStore = cookies();
    const token = cookieStore.get('_grantX')?.value;

    // Check if the token is present
    if (!token) {
        return NextResponse.json({ success: false, error: 'No token provided' }, { status: 401 });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);
        const userId = decoded.id;

        // Find the user in the database
        const user = await User.findById(userId).select('email');

        // Check if the user exists
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Return the user's email and ID
        return NextResponse.json({ success: true, email: user.email, id: user._id });
    } catch (error) {
        // Handle token verification errors
        return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
}
