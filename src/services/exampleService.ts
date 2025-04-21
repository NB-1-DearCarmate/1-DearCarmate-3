import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  JWT_SECRET,
  PERIOD_ACCESS_TOKEN,
  PERIOD_REFRESH_TOKEN,
  REFRESH_STRING,
} from '../config/constants';
import userRepository from '../repositories/exampleRepository';
import NotFoundError from '../lib/errors/Example3Error';
import UnauthError from '../lib/errors/UnauthError';
import { User, Prisma } from '@prisma/client';
import { UserWithId } from '../../types/AuthedUser';

async function hashingPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function createUser(user: Prisma.UserUncheckedCreateInput) {
  const hashedPassword = await hashingPassword(user.password);
  const createdUser = await userRepository.create({
    ...user,
    password: hashedPassword,
  });
  return filterSensitiveUserData(createdUser);
}

async function getUser(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthError();
  }
  await verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function getUserById(id: number) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new NotFoundError(userRepository.getEntityName(), id);
  }

  return filterSensitiveUserData(user);
}

async function updateUser(id: number, data: Prisma.UserUncheckedUpdateInput) {
  const updatedUser = await userRepository.update(id, data);
  return filterSensitiveUserData(updatedUser);
}

async function updatePassword(id: number, password: string) {
  const hashedPassword = await hashingPassword(password);
  const updatedUser = await userRepository.update(id, { password: hashedPassword });
  return filterSensitiveUserData(updatedUser);
}

async function refreshToken(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new UnauthError();
  }
  const accessToken = createToken(user);
  const newRefreshToken = createToken(user, REFRESH_STRING);
  return { accessToken, newRefreshToken };
}

async function verifyPassword(inputPassword: string, savedPassword: string) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword);
  if (!isValid) {
    throw new UnauthError();
  }
}

function filterSensitiveUserData(user: Partial<User> = {}) {
  const { password, ...rest } = user;
  return rest;
}

function createToken(userWithId: UserWithId, type?: String) {
  const payload = { userId: userWithId.id };
  const options: SignOptions = {
    expiresIn: type === REFRESH_STRING ? PERIOD_REFRESH_TOKEN : PERIOD_ACCESS_TOKEN,
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

export default {
  createUser,
  getUser,
  getUserById,
  updateUser,
  createToken,
  refreshToken,
  updatePassword,
};
