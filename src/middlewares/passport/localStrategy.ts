import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../../services/exampleService';
import { EMAIL_STRING } from '../../config/constants';

const localStrategy = new LocalStrategy(
  {
    usernameField: EMAIL_STRING,
  },
  async (email, password, done) => {
    try {
      const user = await userService.getUser(email, password);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  },
);

export default localStrategy;
