import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileTypeFromFile } from 'file-type';
import fs from 'fs';
import EmptyUploadError from '../lib/errors/EmptyUploadError';
import FileExtError from '../lib/errors/FileExtError';

interface UploadHandlerOptions {
  uploadFolder: string;
  fileSizeLimit: number;
}

const dirname = path.resolve();

export function uploadHandler(options: UploadHandlerOptions) {
  const { uploadFolder, fileSizeLimit } = options;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(dirname, uploadFolder));
    },
    filename: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const timestamp = Date.now();
      const uniqueFileName = `${baseName}-${timestamp}${ext}`;
      cb(null, uniqueFileName);
    },
  });

  const upload = multer({
    storage,
    limits: { fieldNameSize: 100, fileSize: fileSizeLimit },
  });

  return upload;
}

function hasFile(req: Request): req is Request & { file: Express.Multer.File } {
  return !!req.file;
}

export async function mimeTypeVerifier(req: Request, uploadFolder: string, allowedExt: string[]) {
  if (!hasFile(req)) throw new EmptyUploadError();
  const filePath = path.join(dirname, uploadFolder, req.file.filename);
  const mimeType = await fileTypeFromFile(filePath);
  const ext = mimeType?.ext ?? null;
  if (!ext || !allowedExt.includes(ext)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
    throw new FileExtError();
  }
  return req.file;
}
