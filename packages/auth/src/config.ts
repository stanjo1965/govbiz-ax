import type { NextAuthConfig } from 'next-auth';
import type { UserRole } from './types';

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
export const LOGIN_PAGE = '/login';

export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/api/health',
];

export const API_AUTH_PREFIX = '/api/auth';

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  citizen: 0,
  officer: 1,
  admin: 2,
  superadmin: 3,
};

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function createAuthConfig(overrides?: Partial<NextAuthConfig>): NextAuthConfig {
  return {
    providers: [],
    pages: {
      signIn: LOGIN_PAGE,
      error: '/auth/error',
    },
    session: {
      strategy: 'jwt',
      maxAge: 8 * 60 * 60, // 8 hours for government apps
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = (user as any).role ?? 'citizen';
          token.department = (user as any).department;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          (session.user as any).id = token.sub!;
          (session.user as any).role = token.role as UserRole;
          (session.user as any).department = token.department;
        }
        return session;
      },
      async authorized({ auth, request }) {
        const isLoggedIn = !!auth?.user;
        const { pathname } = request.nextUrl;

        if (pathname.startsWith(API_AUTH_PREFIX)) return true;
        if (PUBLIC_ROUTES.includes(pathname)) return true;

        return isLoggedIn;
      },
    },
    ...overrides,
  };
}
