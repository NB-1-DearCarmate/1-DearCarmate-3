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

const companyRouter = express.Router();

companyRouter.get(
  '/',
  passport.authenticate('access-token', { session: false }),
  withAsync(getCompanyList),
);
companyRouter.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  withAsync(postCompany),
);
companyRouter.get(
  '/users',
  passport.authenticate('access-token', { session: false }),
  withAsync(getCompanyUsers),
);
companyRouter.patch(
  '/:companyId',
  passport.authenticate('access-token', { session: false }),
  withAsync(patchCompany),
);

companyRouter.delete(
  '/:companyId',
  passport.authenticate('access-token', { session: false }),
  withAsync(deleteCompany),
);

export default companyRouter;
