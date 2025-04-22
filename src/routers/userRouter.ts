import express from 'express';
import { withAsync } from '../lib/withAsync';
import { createUser, deleteUser, editInfo, getInfo, withDraw } from '../controllers/userController';
import passport from '../middlewares/passport/passport';

const usersRouter = express.Router();

usersRouter.post('/users', withAsync(createUser));

usersRouter.get(
  '/users/me',
  passport.authenticate('access-token', { session: false }),
  withAsync(getInfo),
);
usersRouter.patch(
  '/users/me',
  passport.authenticate('access-token', { session: false }),
  withAsync(editInfo),
);
usersRouter.delete(
  '/users/me',
  passport.authenticate('access-token', { session: false }),
  withAsync(withDraw),
);
usersRouter.delete(
  '/users/:userId',
  passport.authenticate('access-token', { session: false }),
  withAsync(deleteUser),
);

export default usersRouter;
