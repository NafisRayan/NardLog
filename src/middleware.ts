import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Array of paths that require authentication
const protectedPaths = [
  '/write',
  '/settings',
  '/bookmarks',
];

// Array of paths that are only accessible to non-authenticated users
const authOnlyPaths = [
  '/signin',
  '/signup',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Check if the path starts with any protected path
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  // Check if the path is for non-authenticated users only
  const isAuthOnlyPath = authOnlyPaths.some(path => pathname === path);

  // If the path is protected and there's no token, redirect to sign in
  if (isProtectedPath && !token) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is authenticated and tries to access auth-only paths, redirect to home
  if (isAuthOnlyPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
