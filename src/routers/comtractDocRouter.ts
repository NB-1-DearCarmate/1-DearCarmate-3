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

const typeArray = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/bmp',
  'image/vnd.microsoft.icon',
  'text/plain',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/zip',
  'application/vnd.rar',
  'application/x-7z-compressed',
  'application/x-hwp',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/rtf',
  'text/html',
  'text/markdown',
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
    allowedTypes: typeArray,
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
