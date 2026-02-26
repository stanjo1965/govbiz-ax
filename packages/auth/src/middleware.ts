import { type NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES, API_AUTH_PREFIX, LOGIN_PAGE } from './config';

export function createAuthMiddleware(options?: {
  publicRoutes?: string[];
  loginPage?: string;
}) {
  const publicRoutes = options?.publicRoutes ?? PUBLIC_ROUTES;
  const loginPage = options?.loginPage ?? LOGIN_PAGE;

  return function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow auth API routes
    if (pathname.startsWith(API_AUTH_PREFIX)) {
      return NextResponse.next();
    }

    // Allow public routes
    if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
      return NextResponse.next();
    }

    // Check for session token
    const token = request.cookies.get('authjs.session-token')?.value
      || request.cookies.get('__Secure-authjs.session-token')?.value;

    if (!token) {
      const loginUrl = new URL(loginPage, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  };
}

export type { NextRequest } from 'next/server';
