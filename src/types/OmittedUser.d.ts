import { User, USER_ROLE } from '@prisma/client';

export type OmittedUser = Omit<User, 'encryptedPassword'>;
