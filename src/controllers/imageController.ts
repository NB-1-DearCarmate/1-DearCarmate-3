import { Request, Response } from 'express';
import CommonError from '../lib/errors/CommonError';

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    throw new CommonError('이미지 파일이 없습니다.', 400);
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
};
