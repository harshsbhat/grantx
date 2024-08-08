
import { NextResponse } from 'next/server';

export async function POST(req) {

  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
    }

    const deleteCookie = (res, name) => {
      res.setHeader('Set-Cookie', `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly`);
      res.status(200).json({ success: true, message: 'Logout successful' });
    };

    deleteCookie(NextResponse, '_grantX');
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
