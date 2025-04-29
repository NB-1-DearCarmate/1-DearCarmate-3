import express from 'express';
import { withAsync } from '../lib/withAsync';
import {
  deleteCustomer,
  getCustomer,
  getCustomerList,
  patchCustomer,
  postCustomer,
  postCustomers,
} from '../controllers/customerController';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';

const customerRouter = express.Router();
customerRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCustomerList),
);

customerRouter.post(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(postCustomer),
);
customerRouter.get(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(postCustomers),
);
customerRouter.get(
  '/:customerId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCustomer),
);
customerRouter.patch(
  '/:customerId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(patchCustomer),
);

customerRouter.delete(
  '/:customerId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(deleteCustomer),
);

export default customerRouter;
