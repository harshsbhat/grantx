import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import { NextResponse } from 'next/server';
import { generateToken } from '../../utils/jwt';

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken(user);

    const response = NextResponse.json(
      { success: true, data: 'User logged in successfully' },
      { status: 200 }
    );

    response.cookies.set('_grantX', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use process.env.NODE_ENV for secure flag
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server Error' },
      { status: 500 }
    );
  }
}
