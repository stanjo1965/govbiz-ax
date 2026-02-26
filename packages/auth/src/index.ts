// Types
export type { GovBizUser, UserRole, SessionUser, AuthConfig, PermissionCheck } from './types';

// Config
export {
  createAuthConfig,
  hasRole,
  ROLE_HIERARCHY,
  PUBLIC_ROUTES,
  LOGIN_PAGE,
  DEFAULT_LOGIN_REDIRECT,
  API_AUTH_PREFIX,
} from './config';

// Hooks (client-side)
export { useCurrentUser, useHasRole, useIsAuthenticated, useSession, signIn, signOut } from './hooks';

// Providers
export { createCredentialsProvider } from './providers';

// Middleware
export { createAuthMiddleware } from './middleware';
