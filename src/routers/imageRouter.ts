import { Router } from 'express';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY, IMAGE_PATH } from '../config/constants';
import { withAsync } from '../lib/withAsync';
import { uploadHandler } from '../lib/fileUploader';
import { uploadImage } from '../controllers/imageController';
const router = Router();

const typeArray = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/bmp',
  'image/svg+xml',
  'image/vnd.microsoft.icon',
];

router.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  uploadHandler({
    uploadFolder: IMAGE_PATH,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedTypes: typeArray,
  }).single('file'),
  withAsync(uploadImage),
);

export default router;
