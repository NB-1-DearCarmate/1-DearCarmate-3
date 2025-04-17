import passport from 'passport';
import localStrategy from './localStrategy';
import jwtStrategy from './jwtStrategy';
import userRepository from '../../repositories/exampleRepository';
import {
  ACCESS_TOKEN_STRATEGY,
  ID_STRING,
  LOCAL_STRING,
  REFRESH_TOKEN_STRATEGY,
} from '../../config/constants';
import UnauthError from '../../lib/errors/UnauthError';
import { UserWithId } from '../../../types/example-type';

passport.use(LOCAL_STRING, localStrategy);
passport.use(ACCESS_TOKEN_STRATEGY, jwtStrategy.accessTokenStrategy);
passport.use(REFRESH_TOKEN_STRATEGY, jwtStrategy.refreshTokenStrategy);

const NUMBER_TYPE = typeof 0;
function isUserWithId(user: unknown): user is UserWithId {
  return (
    user instanceof Object &&
    ID_STRING in user &&
    typeof (user as { id: unknown }).id === NUMBER_TYPE
  );
}
passport.serializeUser((user: unknown, done) => {
  if (isUserWithId(user)) {
    done(null, user.id);
  } else {
    done(new UnauthError());
  }
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await userRepository.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
