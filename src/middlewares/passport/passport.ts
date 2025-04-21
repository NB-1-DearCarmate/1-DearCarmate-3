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
    'role' in user &&
    typeof (user as { role: unknown }).role === 'string'
  );
}
passport.serializeUser((user: unknown, done) => {
  if (isUserWithId(user)) {
    done(null, { id: user.id, role: user.role });
  } else {
    done(new UnauthError());
  }
});

passport.deserializeUser(async (serializedUser: { id: string; role: string }, done) => {
  try {
    const employee = await userRepository.findById(serializedUser.id);
    if (serializedUser.role === 'admin' && employee) {
      // adminRepository.findById(serializedUser.id)
    } else if (serializedUser.role === 'owner') {
      // userRepository.findById(serializedUser.id)
    } else {
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
