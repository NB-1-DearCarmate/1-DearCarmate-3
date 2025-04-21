import { USER } from '@prisma/client';
export type AuthedUser = { id: string; type: string } & Partial<Omit<USER, 'id'>>;
