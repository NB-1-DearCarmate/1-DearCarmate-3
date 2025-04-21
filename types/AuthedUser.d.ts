import { USER, USER_ROLE } from '@prisma/client';
export type AuthedUser = { id: string; role: USER_ROLE } & Partial<Omit<USER, 'id' | 'role'>>;
