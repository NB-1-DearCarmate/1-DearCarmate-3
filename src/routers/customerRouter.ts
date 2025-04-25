import express from 'express';
import { withAsync } from '../lib/withAsync';
import {
  deleteCustomer,
  getCustomer,
  patchCustomer,
  postCustomer,
  postCustomers,
} from '../controllers/customerController';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';

const customerRouter = express.Router();

customerRouter.post(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(postCustomer),
);
customerRouter.get(
  '/:customersId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCustomer),
);
customerRouter.patch(
  '/:customersId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(patchCustomer),
);

customerRouter.delete(
  '/:customersId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(deleteCustomer),
);
customerRouter.get(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(postCustomers),
);

export default customerRouter;
