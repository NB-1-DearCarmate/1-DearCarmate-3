import { USER } from '@prisma/client';
export type AuthedUser = { id: string; role: string } & Partial<Omit<USER, 'id'>>;
