import passport from 'passport';
import localStrategy from './localStrategy';
import jwtStrategy from './jwtStrategy';
import userRepository from '../../repositories/exampleRepository';
import UnauthError from '../../lib/errors/UnauthError';
import { UserWithId } from '../../../types/AuthedUser';

passport.use('local', localStrategy);
passport.use('access-token', jwtStrategy.accessTokenStrategy);
passport.use('refresh-token', jwtStrategy.refreshTokenStrategy);

const NUMBER_TYPE = typeof 0;
function isUserWithId(user: unknown): user is UserWithId {
  return (
    user instanceof Object && 'id' in user && typeof (user as { id: unknown }).id === NUMBER_TYPE
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
