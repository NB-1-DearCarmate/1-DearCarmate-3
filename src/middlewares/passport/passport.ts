import passport from 'passport';
import localStrategy from './localStrategy';
import jwtStrategy from './jwtStrategy';
import userRepository from '../../repositories/userRepository';
import UnauthError from '../../lib/errors/UnauthError';
import { AuthedUser } from '../../../types/AuthedUser';

passport.use('local', localStrategy);
passport.use('access-token', jwtStrategy.accessTokenStrategy);
passport.use('refresh-token', jwtStrategy.refreshTokenStrategy);

function isUserWithId(user: unknown): user is AuthedUser {
  return (
    user instanceof Object &&
    'id' in user &&
    typeof (user as { id: unknown }).id === 'string' &&
    'type' in user &&
    typeof (user as { type: unknown }).type === 'string'
  );
}
passport.serializeUser((user: unknown, done) => {
  if (isUserWithId(user)) {
    done(null, { id: user.id, type: user.type });
  } else {
    done(new UnauthError());
  }
});

passport.deserializeUser(async (serializedUser: { id: string; type: string }, done) => {
  try {
    if (serializedUser.type === 'admin') {
      // adminRepository.findById(serializedUser.id)
    } else if (serializedUser.type === 'owner') {
      // userRepository.findById(serializedUser.id)
    } else {
      const employee = await userRepository.findById(serializedUser.id);
      if (employee === null) {
        throw new UnauthError();
      }
    }

    done(null, serializedUser);
  } catch (error) {
    done(error);
  }
});

export default passport;
