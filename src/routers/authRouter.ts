import express from 'express';
import { withAsync } from '../lib/withAsync';
import { login, refreshToken } from '../controllers/authController';
import passport from '../middlewares/passport/passport';
import { LOCAL_STRATEGY, REFRESH_TOKEN_STRATEGY } from '../config/constants';

const authRouter = express.Router();

authRouter.post(
  '/login',
  passport.authenticate(LOCAL_STRATEGY, { session: false }),
  withAsync(login),
);
authRouter.post(
  '/refresh',
  passport.authenticate(REFRESH_TOKEN_STRATEGY, { session: false }),
  withAsync(refreshToken),
);

export default authRouter;
