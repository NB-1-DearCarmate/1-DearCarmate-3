import { Request, Response } from 'express';
import CommonError from '../lib/errors/CommonError';

/**
 * @openapi
 * /images/uploads:
 *   post:
 *     summary: 이미지 업로드
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *     responses:
 *       201:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: 업로드된 이미지 URL
 *       400:
 *         description: 이미지 파일이 없을 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 에러 메시지
 */
export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    throw new CommonError('이미지 파일이 없습니다.', 400);
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
};
