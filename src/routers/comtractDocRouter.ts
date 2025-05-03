import express from 'express';
import { withAsync } from '../lib/withAsync';
import passport from '../middlewares/passport/passport';
import { ACCESS_TOKEN_STRATEGY, DOCUMENT_PATH } from '../config/constants';
import {
  getDocumentList,
  getContractChoice,
  uploadDocument,
  downloadDocument,
} from '../controllers/contractDocController';
import { uploadHandler } from '../lib/fileUploader';
const contractDocRouter = express.Router();

const extArray = [
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
];

contractDocRouter.get(
  '/draft',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getContractChoice),
);

contractDocRouter.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  uploadHandler({
    uploadFolder: DOCUMENT_PATH,
    fileSizeLimit: 50 * 1024 * 1024,
    allowedExt: extArray,
  }).single('contractDocument'),
  withAsync(uploadDocument),
);

contractDocRouter.get(
  '/:contractDocumentId/download',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(downloadDocument),
);

contractDocRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getDocumentList),
);

export default contractDocRouter;
