import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('Middleware triggered for:', req.nextUrl.pathname);
  const token = req.cookies.get('token')?.value;
  const user = req.cookies.get('user')?.value;

  const isHome = req.nextUrl.pathname === '/';
  console.log(isHome, req.nextUrl.pathname)
  if (isHome && token && user) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

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