import passport from 'passport';
import localStrategy from './localStrategy';
import jwtStrategy from './jwtStrategy';
import {
  ACCESS_TOKEN_STRATEGY,
  LOCAL_STRATEGY,
  REFRESH_TOKEN_STRATEGY,
} from '../../config/constants';

passport.use(LOCAL_STRATEGY, localStrategy);
passport.use(ACCESS_TOKEN_STRATEGY, jwtStrategy.accessTokenStrategy);
passport.use(REFRESH_TOKEN_STRATEGY, jwtStrategy.refreshTokenStrategy);

export default passport;
