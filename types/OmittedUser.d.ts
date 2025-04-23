import { User, USER_ROLE } from '@prisma/client';
// export type AuthedUser = { id: number; role: USER_ROLE } & Partial<Omit<USER, 'id' | 'role'>>;

export type OmittedUser = Omit<User, 'encryptedPassword'>;
