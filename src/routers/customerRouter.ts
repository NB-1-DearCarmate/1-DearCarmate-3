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
import upload from '../lib/multer';
import { uploadHandler } from '../lib/fileUploader';

const customerRouter = express.Router();

customerRouter.post(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(postCustomer),
);
customerRouter.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  uploadHandler({
    uploadFolder: 'public/',
    fileSizeLimit: 5 * 1024 * 1024,
    memoryFlag: true,
  }).single('file'),
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

export default customerRouter;
