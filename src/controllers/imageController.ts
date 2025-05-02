import { Request, Response } from 'express';
import { IMAGE_PATH } from '../config/constants';
import EmptyUploadError from '../lib/errors/EmptyUploadError';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  if (!file) {
    throw new EmptyUploadError();
  }
  const downloadUrl = `${process.env.PROTOCOL}://${req.get('host')}/${IMAGE_PATH}/${file.filename}`;
  res.status(201).json({ imageUrl: downloadUrl });
};
