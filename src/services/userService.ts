import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/constants';
import userRepository from '../repositories/userRepository';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthError from '../lib/errors/UnauthError';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO } from '../lib/dtos/userDTO';
import CommonError from '../lib/errors/CommonError';
import { CreateUserBodyType, UpdateUserBodyType } from '../structs/userStructs';
import { PageParamsType } from '../structs/commonStructs';
import { OmittedUser } from '../types/OmittedUser';
import { buildSearchCondition } from '../lib/searchCondition';
import { ResponseCompanyUserDTO, ResponseCompanyUserListDTO } from '../lib/dtos/companyDTO';

async function hashingPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function createUser(data: CreateUserBodyType, companyId: number) {
  const hashedPassword = await hashingPassword(data.password);
  const createdUser = await userRepository.create(
    new CreateUserDTO(data, companyId, hashedPassword),
  );
  return filterSensitiveUserData(createdUser);
}

async function authenticateUser(email: string, password: string) {
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
    throw new NotFoundError('user', id);
  }

  return filterSensitiveUserData(user);
}

async function getCompanyUsers(params: PageParamsType) {
  const searchCondition = buildSearchCondition(params, ['companyName', 'email', 'name']);
  const where = searchCondition.whereCondition;
  const prismaParams = {
    ...searchCondition.pageCondition,
    include: {
      company: {
        select: { companyName: true },
      },
    },
    where,
  };

  const users = await userRepository.findMany(prismaParams);
  const totalItemCount = await userRepository.getCount({ where });
  return new ResponseCompanyUserListDTO(params.page, params.pageSize, users, totalItemCount);
}

async function getCompanyIdById(userId: number) {
  const user = await userRepository.findCompanyIdbyUserId(userId);
  if (!user) {
    throw new NotFoundError('user', userId);
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
    throw new UnauthError();
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
  getUser: authenticateUser,
  getUserById,
  getCompanyIdById,
  updateUser,
  deleteUser,
  getCompanyUsers,
  createToken,
  refreshToken,
};
