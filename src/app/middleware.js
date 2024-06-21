import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function middleware(req) {
    const token = req.cookies.get('_grantX');

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard'], 
};
