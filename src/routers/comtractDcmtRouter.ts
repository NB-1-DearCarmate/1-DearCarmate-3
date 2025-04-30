import express from 'express';
import { withAsync } from '../lib/withAsync';
import passport from '../middlewares/passport/passport';
import { ACCESS_TOKEN_STRATEGY } from '../config/constants';
import { getDocumentList, getContractChoice } from '../controllers/contractDcmtController';
import { createUploadHandler } from '../lib/fileUploader';
const { upload, uploadFile } = createUploadHandler({
  uploadFolder: 'public/documents',
  fileSizeLimit: 50 * 1024 * 1024,
  allowedExt: [
    'jpg',
    'png',
    'webp',
    'gif',
    'avif',
    'bmp',
    'ico',
    'txt',
    'pdf',
    'docx',
    'xlsx',
    'csv',
    'zip',
    'rar',
    '7z',
    'hwp',
  ],
});
const contractDcmtRouter = express.Router();

contractDcmtRouter.get(
  '/draft',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getContractChoice),
);

contractDcmtRouter.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  upload.single('contractDocument'),
  withAsync(uploadFile),
);

contractDcmtRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getDocumentList),
);

export default contractDcmtRouter;
