import { Router } from 'express';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY, IMAGE_PATH } from '../config/constants';
import { withAsync } from '../lib/withAsync';
import { uploadHandler } from '../lib/fileUploader';
import { uploadImage } from '../controllers/imageController';
const router = Router();

const extArray = ['jpg', 'png', 'webp', 'gif', 'avif', 'bmp', 'ico'];

router.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  uploadHandler({
    uploadFolder: IMAGE_PATH,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedExt: extArray,
  }).single('image'),
  withAsync(uploadImage),
);

export default router;
