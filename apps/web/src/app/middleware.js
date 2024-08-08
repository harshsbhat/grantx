import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function middleware(req) {
    const token = req.cookies.get('_grantX');

    if (!token) {
        // Redirect to login if token is missing
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);
        req.user = decoded;  // Set decoded token payload to req.user
        return NextResponse.next();  // Proceed to the requested route
    } catch (error) {
        console.error('Token verification error:', error);
        // Redirect to login if token verification fails
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/applications',
        '/rootkey',
        '/applications/:path*'
    ],
};
