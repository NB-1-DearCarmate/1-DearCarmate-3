import { Router } from 'express';
import upload from '../lib/multer';
import { uploadImage } from '../controllers/imageController';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';
import { withAsync } from '../lib/withAsync';

const router = Router();

router.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  upload.single('image'),
  withAsync(uploadImage),
);

export default router;
