import express from 'express';
import { withAsync } from '../lib/withAsync';
import passport from '../middlewares/passport/passport';
import { ACCESS_TOKEN_STRATEGY, DOCUMENT_PATH } from '../config/constants';
import {
  getDocumentList,
  getContractChoice,
  uploadDocument,
  downloadDocument,
} from '../controllers/contractDcmtController';
import { uploadHandler } from '../lib/fileUploader';
const contractDcmtRouter = express.Router();

contractDcmtRouter.get(
  '/draft',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getContractChoice),
);

contractDcmtRouter.post(
  '/upload',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  uploadHandler({
    uploadFolder: DOCUMENT_PATH,
    fileSizeLimit: 50 * 1024 * 1024,
  }).single('contractDocument'),
  withAsync(uploadDocument),
);

contractDcmtRouter.get(
  '/:contractDocumentId/download',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(downloadDocument),
);

contractDcmtRouter.get(
  '/',
  passport.authenticate(ACCESS_TOKEN_STRATEGY, { session: false }),
  withAsync(getDocumentList),
);

export default contractDcmtRouter;
