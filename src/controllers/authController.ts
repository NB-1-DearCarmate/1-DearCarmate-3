import userService from '../services/userService';
import { Request, RequestHandler, Response } from 'express';
import { OmittedUser } from '../../types/OmittedUser';
import { ACCESS_tOKEN_STRING, REFRESH_tOKEN_STRING } from '../config/constants';
import { LoginResponseDTO } from '../lib/dtos/authDTO';

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
  const resultDTO = new LoginResponseDTO(reqUser, accessToken, refreshToken);
  res.send({ resultDTO });
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
  res.clearCookie(ACCESS_tOKEN_STRING, { path: '/' });
  res.clearCookie(REFRESH_tOKEN_STRING, { path: '/' });
  res.send(204).send('로그아웃');
};

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
