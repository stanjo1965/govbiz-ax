'use client';

import { useSession } from 'next-auth/react';
import type { SessionUser, UserRole } from './types';
import { hasRole } from './config';

export function useCurrentUser(): SessionUser | null {
  const { data: session } = useSession();
  if (!session?.user) return null;

  return {
    id: (session.user as any).id,
    email: session.user.email!,
    name: session.user.name!,
    role: (session.user as any).role ?? 'citizen',
    department: (session.user as any).department,
  };
}

export function useHasRole(requiredRole: UserRole): boolean {
  const user = useCurrentUser();
  if (!user) return false;
  return hasRole(user.role, requiredRole);
}

export function useIsAuthenticated(): boolean {
  const { status } = useSession();
  return status === 'authenticated';
}

export { useSession, signIn, signOut } from 'next-auth/react';
