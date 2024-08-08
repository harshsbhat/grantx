import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const res = NextResponse.json({ success: true, message: 'Logout successful' });

    // Set the cookie to be expired
    res.headers.set('Set-Cookie', cookie.serialize('_grantX', '', {
      path: '/',
      expires: new Date(0),
      httpOnly: true,
    }));

    return res;
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
