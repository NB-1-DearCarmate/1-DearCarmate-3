import { Request, Response } from 'express';
import { mimeTypeVerifier } from '../lib/fileUploader';
import { IMAGE_PATH } from '../config/constants';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const file = await mimeTypeVerifier(req, IMAGE_PATH, [
    'jpg',
    'png',
    'webp',
    'gif',
    'avif',
    'bmp',
    'ico',
  ]);

  const downloadUrl = `${process.env.PROTOCOL}://${req.get('host')}/${IMAGE_PATH}/${file.filename}`;
  res.status(201).json({ imageUrl: downloadUrl });
};
