import express from 'express';
import { withAsync } from '../lib/withAsync';
import contractController from '../controllers/contractController';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';

const router = express.Router();

router.get(
  '/customers',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.getCustomerDropdown),
);

router.get(
  '/users',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.getUserDropdown),
);

router.patch(
  '/:id/status',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.updateContractStatus),
);

router.get(
  '/:id',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.getContractById),
);

router.patch(
  '/:id',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.updateContract),
);

router.delete(
  '/:id',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.deleteContract),
);

router.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.getAllContracts),
);

router.post(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(contractController.createContract),
);

export default router;
