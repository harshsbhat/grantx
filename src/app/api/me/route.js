import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

const secret = process.env.JWT_SECRET;

export async function GET(req) {
    await dbConnect();

    const cookieStore = cookies();
    const token = cookieStore.get('_grantX')?.value;

    if (!token) {
        return NextResponse.json({ success: false, error: 'No token provided' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const userId = decoded.id;

        const user = await User.findById(userId).select('email');

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, email: user.email, id: user._id});
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
}
