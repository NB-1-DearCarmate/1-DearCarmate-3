import userService from '../services/userService';
import { Request, RequestHandler, Response } from 'express';
import { OmittedUser } from '../../types/OmittedUser';
import { ACCESS_tOKEN_STRING, REFRESH_tOKEN_STRING } from '../config/constants';
import { LoginResponseDTO } from '../lib/dtos/authDTO';

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: 로그인 성공. 액세스토큰, 리프레시토큰 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDTO'
 */
export const login: RequestHandler = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const accessToken = userService.createToken(reqUser);
  const refreshToken = userService.createToken(reqUser, 'refresh');
  res.cookie(REFRESH_tOKEN_STRING, refreshToken, {
    path: '/auth/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
  res.send(new LoginResponseDTO(reqUser, accessToken, refreshToken));
};

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: 로그아웃
 *     tags:
 *       - Auth
 *     responses:
 *       204:
 *         description: 성공적으로 로그아웃됨
 */
export const logout: RequestHandler = async (req: Request, res: Response) => {
  res.clearCookie(ACCESS_tOKEN_STRING, { path: '/' });
  res.clearCookie(REFRESH_tOKEN_STRING, { path: '/' });
  res.status(204).send('로그아웃');
};

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: 액세스토큰 갱신
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 새로운 액세스 및 리프레시 토큰 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 */
export const refreshToken = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const { accessToken, newRefreshToken } = await userService.refreshToken(reqUser.id);
  res.cookie(REFRESH_tOKEN_STRING, newRefreshToken, {
    path: '/auth/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
  res.send({ accessToken, refreshToken: newRefreshToken });
};
