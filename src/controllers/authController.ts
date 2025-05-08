import userService from '../services/userService';
import { Request, RequestHandler, Response } from 'express';
import { OmittedUser } from '../types/OmittedUser';
import { ACCESS_tOKEN_STRING, REFRESH_tOKEN_STRING } from '../config/constants';
import { LoginResponseDTO } from '../lib/dtos/authDTO';

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자가 이메일과 비밀번호를 통해 로그인하고, 성공적으로 로그인 시 액세스토큰과 리프레시토큰을 반환합니다.
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
 *                 description: 로그인할 사용자의 이메일 주소
 *                 example: user1@sunshine.com
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호
 *                 example: password
 *     responses:
 *       200:
 *         description: 로그인 성공. 액세스토큰과 리프레시토큰을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDTO'
 *       400:
 *         description: 잘못된 요청. 이메일이나 비밀번호가 잘못되었습니다.
 *       401:
 *         description: 인증 실패. 제공된 이메일 또는 비밀번호가 일치하지 않습니다.
 *       500:
 *         description: 서버 오류. 로그인 과정에서 오류가 발생했습니다.
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
 *     description: 사용자가 로그아웃할 때, 쿠키에 저장된 액세스토큰과 리프레시토큰을 삭제합니다.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 성공적으로 로그아웃됨
 *       500:
 *         description: 서버 오류. 로그아웃 처리 중 오류가 발생했습니다.
 */
export const logout: RequestHandler = async (req: Request, res: Response) => {
  res.clearCookie(ACCESS_tOKEN_STRING, { path: '/' });
  res.clearCookie(REFRESH_tOKEN_STRING, { path: '/' });
  res.send('로그아웃');
};

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: 액세스토큰 갱신
 *     description: 유효한 리프레시토큰을 사용하여 새로운 액세스토큰과 리프레시토큰을 반환합니다.
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
 *                   description: 새로운 액세스토큰
 *                 refreshToken:
 *                   type: string
 *                   description: 새로운 리프레시토큰
 *       401:
 *         description: 리프레시토큰이 유효하지 않거나 만료된 경우
 *       500:
 *         description: 서버 오류. 토큰 갱신 처리 중 오류 발생
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
