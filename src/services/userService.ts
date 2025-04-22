import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/constants';
import userRepository from '../repositories/userRepository';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthError from '../lib/errors/UnauthError';
import { User } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';

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
  getUser,
  getUserById,
  createToken,
  refreshToken,
};
