export interface GovBizUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  position?: string;
  avatarUrl?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'citizen' | 'officer' | 'admin' | 'superadmin';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
}

export interface AuthConfig {
  loginPage?: string;
  callbackUrl?: string;
  allowedRoles?: UserRole[];
  sessionMaxAge?: number;
}

export interface PermissionCheck {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'admin';
}
