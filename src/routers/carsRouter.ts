import express from 'express';
import { withAsync } from '../lib/withAsync';
import {
  createCar,
  deleteCar,
  getCar,
  getCarList,
  updateCar,
  getCarModelList,
} from '../controllers/carsController';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';

const carsRouter = express.Router();

carsRouter.post(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(createCar),
);
carsRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCarList),
);

carsRouter.get(
  '/models',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCarModelList),
);
carsRouter.patch(
  '/:carId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(updateCar),
);
carsRouter.delete(
  '/:carId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(deleteCar),
);
carsRouter.get(
  '/:carId',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getCar),
);

export default carsRouter;
