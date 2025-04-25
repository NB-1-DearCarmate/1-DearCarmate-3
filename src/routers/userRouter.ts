import express from 'express';
import { withAsync } from '../lib/withAsync';
import { createUser, deleteUser, editInfo, getInfo, withDraw } from '../controllers/userController';
import passport from '../middlewares/passport/passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';

const usersRouter = express.Router();

usersRouter.get(
  '/me',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getInfo),
);
usersRouter.patch(
  '/me',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(editInfo),
);
usersRouter.delete(
  '/me',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(withDraw),
);
usersRouter.delete(
  '/:userId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(deleteUser),
);

usersRouter.post('/', withAsync(createUser));

export default usersRouter;
