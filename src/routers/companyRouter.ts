import express from 'express';
import { withAsync } from '../lib/withAsync';
import {
  postCompany,
  getCompanyList,
  getCompanyUsers,
  patchCompany,
  deleteCompany,
} from '../controllers/companyController';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';

const companyRouter = express.Router();

companyRouter.get(
  '/users',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCompanyUsers),
);
companyRouter.patch(
  '/:companyId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(patchCompany),
);

companyRouter.delete(
  '/:companyId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(deleteCompany),
);
companyRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCompanyList),
);
companyRouter.post(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(postCompany),
);

export default companyRouter;
