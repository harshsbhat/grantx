import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import { NextResponse } from 'next/server';
import { generateToken } from '../../utils/jwt';

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    const user = new User({ email, password, rootKeys: [] });
    await user.save();

    const token = generateToken(user);

    const response = NextResponse.json({ success: true, data: 'User registered successfully' }, { status: 201 });
    response.cookies.set('_grantX', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
