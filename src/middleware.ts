import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers'
// Middleware to protect dashboard routes
// and redirect unauthenticated users to the login page
export async function middleware(req: NextRequest) {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const user = cookieStore.get('user')
   
    const pathname = req.nextUrl.pathname;
   const isLoginPage = pathname === '/';
    const isDashboard = pathname.startsWith('/dashboard');

   if (isDashboard && !token || !user) {
    // User is not signed in but trying to access dashboard
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isLoginPage && token && user) {
    // User is signed in but trying to access login
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Apply only to dashboard routes
export const config = {
  matcher: ['/dashboard/:path*', '/', '/openbanking/:path*'],
};