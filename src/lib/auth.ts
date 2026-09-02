import { Role } from '@prisma/client';

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

// Simulated active session helper for Server Actions & API Routes
export function getActiveSession(): AuthSession {
  return {
    userId: 'admin-user-id-001',
    email: 'admin@zenvy.com',
    name: 'ZENVY Store Admin',
    role: Role.ADMIN,
  };
}

export function requireAdmin(session: AuthSession = getActiveSession()) {
  if (session.role !== Role.ADMIN) {
    throw new Error('Unauthorized access. Admin role required.');
  }
}
