import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect dashboard routes
// and redirect unauthenticated users to the login page
export function middleware(req: NextRequest) {

  const token = req.cookies.get('token')?.value;
  
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !token) {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply only to dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};