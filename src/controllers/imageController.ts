import { Request, Response } from 'express';
import { IMAGE_PATH } from '../config/constants';
import EmptyUploadError from '../lib/errors/EmptyUploadError';

/**
 * @openapi
 * /images/upload:
 *   post:
 *     summary: 이미지 업로드
 *     description: 사용자가 이미지를 업로드하고, 업로드된 이미지의 다운로드 URL을 반환합니다.
 *     tags:
 *       - Image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: 업로드할 이미지 파일을 포함합니다.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
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
 *                   description: 업로드된 이미지의 다운로드 URL
 *               example:
 *                 imageUrl: "http://example.com/images/abc123.jpg"
 *       400:
 *         description: 파일이 업로드되지 않았습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  if (!file) {
    throw new EmptyUploadError();
  }
  const downloadUrl = `${process.env.PROTOCOL}://${req.get('host')}/${IMAGE_PATH}/${file.filename}`;
  res.status(201).json({ imageUrl: downloadUrl });
};
