import express from 'express';
import { withAsync } from '../lib/withAsync';
import passport from '../middlewares/passport/passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';
import { getDocumentList, getContractChoice } from '../controllers/contractDcmtController';

const contractDcmtRouter = express.Router();

contractDcmtRouter.get(
  '/draft',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getContractChoice),
);

contractDcmtRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getDocumentList),
);

export default contractDcmtRouter;
