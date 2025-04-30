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
  allowedExt: string[];
}

export function createUploadHandler(options: UploadHandlerOptions) {
  const dirname = path.resolve();
  const { uploadFolder, fileSizeLimit, allowedExt } = options;

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

  const uploadFile = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) throw new EmptyUploadError();

    const filePath = `${dirname}/${uploadFolder}/${req.file.filename}`;
    const mimeType = await fileTypeFromFile(filePath);
    const ext = mimeType?.ext ?? null;

    if (!ext || !allowedExt.includes(ext)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete file:', err);
      });
      throw new FileExtError();
    }

    const downloadUrl = `${process.env.PROTOCOL}://${req.get('host')}/${uploadFolder}/${req.file.filename}`;
    res.status(201).json({ imageUrl: downloadUrl });
  };

  return { upload, uploadFile };
}
