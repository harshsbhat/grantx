import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        if (req.method !== 'POST') {
            return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
        }

        const response = NextResponse.json({ success: true, message: 'Logout successful' });

        // Set the cookie to expire in the past to delete it
        response.headers.append('Set-Cookie', '_grantX=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly; SameSite=Strict');

        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
