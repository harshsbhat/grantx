import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import { NextResponse } from 'next/server';
import { generateToken } from '../../utils/jwt';

export async function POST(req) {
  await dbConnect();

  try {
    // Parse JSON body from the request
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create a new user
    const user = new User({ email, password, rootKeys: [] });
    await user.save();

    // Generate a JWT token for the new user
    const token = generateToken(user);

    // Create a response
    const response = NextResponse.json(
      { success: true, data: 'User registered successfully' },
      { status: 201 }
    );

    // Set the HTTP-only cookie
    response.cookies.set('_grantX', token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Ensure this is true in production
      sameSite: 'Strict', // Helps prevent CSRF attacks
      maxAge: 3600, // Cookie expiration time in seconds
      path: '/', // Cookie is accessible site-wide
    });

    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, error: 'Server Error' },
      { status: 500 }
    );
  }
}
