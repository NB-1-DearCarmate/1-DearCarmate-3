import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JWT_SECRET, REFRESH_tOKEN_STRING } from '../../config/constants';
import userService from '../../services/userService';
import { Request } from 'express';
import { USER_ROLE } from '@prisma/client';

interface JwtPayload {
  userId: number;
  role: USER_ROLE;
  iat?: number;
  exp?: number;
}

const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
const refreshTokenOptions = {
  jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
  secretOrKey: JWT_SECRET,
};
async function jwtVerify(payload: JwtPayload, done: VerifiedCallback) {
  try {
    const { userId, role } = payload;
    const user = await userService.getUserById(userId);

    const validRoles = [USER_ROLE.ADMIN, USER_ROLE.OWNER, USER_ROLE.EMPLOYEE];
    if (!user || !validRoles.includes(role) || role !== user.role) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

const accessTokenStrategy = new JwtStrategy(accessTokenOptions, jwtVerify);
const refreshTokenStrategy = new JwtStrategy(refreshTokenOptions, jwtVerify);

export default {
  accessTokenStrategy,
  refreshTokenStrategy,
};
