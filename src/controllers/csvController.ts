import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_PATH, STATIC_PATH } from '../config/constants';
import BadRequestError from '../lib/errors/BadRequestError';

const ALLOWED_MIME_TYPES = ['text/csv', 'application/vnd.ms-excel'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

export const uploadCsv = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, PUBLIC_PATH);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  }),

  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },

  fileFilter: function (req, file, cb) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const err = new BadRequestError('Only CSV files are allowed');
      return cb(err);
    }

    cb(null, true);
  },
});

export async function uploadCsvFile(req: Request, res: Response) {
  const host = req.get('host');
  if (!host) {
    throw new BadRequestError('Host is required');
  }
  if (!req.file) {
    throw new BadRequestError('File is required');
  }
  const filePath = path.join(host, STATIC_PATH, req.file.filename);
  const url = `http://${filePath}`;
  res.send({ url });
}
