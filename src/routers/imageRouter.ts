import { Router } from 'express';
import passport from 'passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';
import { withAsync } from '../lib/withAsync';
import { createUploadHandler } from '../lib/fileUploader';

const { upload, uploadFile } = createUploadHandler({
  uploadFolder: 'public/images',
  fileSizeLimit: 5 * 1024 * 1024,
  allowedExt: ['jpg', 'png', 'webp', 'gif', 'avif', 'bmp', 'ico'],
});

const router = Router();

router.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  upload.single('image'),
  withAsync(uploadFile),
);

export default router;
