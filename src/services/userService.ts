import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/constants';
import userRepository from '../repositories/userRepository';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthError from '../lib/errors/UnauthError';
import { USER } from '@prisma/client';
import { AuthedUser } from '../../types/AuthedUser';

async function getUser(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthError();
  }
  await verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function getUserById(id: string) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new NotFoundError(userRepository.getEntityName(), id);
  }

  return filterSensitiveUserData(user);
}

async function refreshToken(userId: string) {
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

function filterSensitiveUserData(user: Partial<USER> = {}) {
  const { password, ...rest } = user;
  return rest;
}

function createToken(authedUser: AuthedUser, type?: String) {
  const payload = { userId: authedUser.id, role: authedUser.role };
  const options: SignOptions = {
    expiresIn: type === 'refresh' ? '6h' : '2d',
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
