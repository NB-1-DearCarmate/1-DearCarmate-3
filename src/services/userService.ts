import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/constants';
import userRepository from '../repositories/userRepository';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthError from '../lib/errors/UnauthError';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO } from '../lib/dtos/userDTO';
import CommonError from '../lib/errors/CommonError';
import { UpdateUserBodyType } from '../structs/userStructs';
import { PageParamsType } from '../structs/commonStructs';
import { OmittedUser } from '../types/OmittedUser';

async function hashingPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function createUser(user: CreateUserDTO) {
  const hashedPassword = await hashingPassword(user.password);
  const { password, ...rest } = user;
  const createdUser = await userRepository.create({
    ...rest,
    encryptedPassword: hashedPassword,
  });
  return filterSensitiveUserData(createdUser);
}

async function getUser(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthError();
  }
  await verifyPassword(password, user.encryptedPassword);
  return filterSensitiveUserData(user);
}

async function getUserById(id: number) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new NotFoundError(userRepository.getEntityName(), id);
  }

  return filterSensitiveUserData(user);
}

async function getUsers({ page, pageSize, searchBy, keyword }: PageParamsType) {
  let prismaParams: {
    skip: number;
    take: number;
    include: {
      company: {
        select: { companyName: true };
      };
    };
    where?: Prisma.UserWhereInput;
  } = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      company: {
        select: { companyName: true },
      },
    },
  };
  let prismaWhereCondition: Prisma.UserWhereInput = {};

  if (searchBy && keyword) {
    switch (searchBy) {
      case 'companyName':
        prismaWhereCondition = {
          company: {
            companyName: {
              contains: keyword,
            },
          },
        };
        break;
      case 'email':
        prismaWhereCondition = {
          email: {
            contains: keyword,
          },
        };
        break;
      case 'name':
        prismaWhereCondition = {
          name: {
            contains: keyword,
          },
        };
        break;
    }
  }
  prismaParams = {
    ...prismaParams,
    where: prismaWhereCondition,
  };

  const users = await userRepository.findMany(prismaParams);
  const totalItemCount = await userRepository.getCount({ where: prismaWhereCondition });
  const omitedUsers = users.map((user) => {
    const { encryptedPassword, ...rest } = user;
    const omitedUser: OmittedUser = rest;
    return omitedUser;
  });
  return {
    currentPage: page,
    totalPages: Math.ceil(totalItemCount / pageSize),
    totalItemCount: totalItemCount,
    data: omitedUsers,
  };
}

async function getCompanyIdById(userId: number) {
  const user = await userRepository.findCompanyIdbyUserId(userId);
  if (!user) {
    throw new NotFoundError(userRepository.getEntityName(), userId);
  }
  return user.companyId;
}

async function updateUser(id: number, data: UpdateUserBodyType) {
  const user = await userRepository.findById(id);
  const { currentPassword, password, passwordConfirmation, ...rest } = data;
  await verifyPassword(currentPassword, user!.encryptedPassword);

  let hashedPassword: string | null = null;
  if (password) {
    hashedPassword = await hashingPassword(password);
  }

  const updatedUser = await userRepository.update(id, {
    ...rest,
    ...(hashedPassword && { encryptedPassword: hashedPassword }),
  });
  return filterSensitiveUserData(updatedUser);
}

async function deleteUser(id: number) {
  return await userRepository.remove(id);
}

async function refreshToken(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new UnauthError();
  }
  const accessToken = createToken(user);
  const newRefreshToken = createToken(user, 'refresh');
  return { accessToken, newRefreshToken };
}

async function verifyPassword(inputPassword: string, savedPassword: string) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword);
  if (!isValid) {
    throw new CommonError('Wrong Password', 400);
  }
}

function filterSensitiveUserData(user: User) {
  const { encryptedPassword, ...rest } = user;
  const omitedUser: OmittedUser = rest;
  return omitedUser;
}

function createToken(authedUser: OmittedUser, type?: String) {
  const payload = { userId: authedUser.id, role: authedUser.role };
  const options: SignOptions = {
    expiresIn: type === 'refresh' ? '7d' : '1h',
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

export default {
  createUser,
  getUser,
  getUserById,
  getCompanyIdById,
  updateUser,
  deleteUser,
  getUsers,
  createToken,
  refreshToken,
};
