import express from 'express';
import { withAsync } from '../lib/withAsync';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';
import { getDashBoard } from '../controllers/dashBoardController';

const dashBoardRouter = express.Router();

dashBoardRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getDashBoard),
);

export default dashBoardRouter;
