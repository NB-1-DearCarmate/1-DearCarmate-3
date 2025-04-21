import { create } from 'superstruct';
import userService from '../services/userService';
import { IdParamsStruct } from '../structs/commonStructs';
import { Request, Response } from 'express';
import { AuthedUser } from '../../types/AuthedUser';
import { REFRESH_tOKEN_STRING } from '../config/constants';

export async function login(req: Request, res: Response) {
  const reqUser = req.user as AuthedUser;
  const accessToken = userService.createToken(reqUser);
  const refreshToken = userService.createToken(reqUser, 'refresh');
  res.cookie(REFRESH_tOKEN_STRING, refreshToken, {
    path: '/auth/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
  res.json({ accessToken });
}

export async function refreshToken(req: Request, res: Response) {
  const reqUser = req.user as AuthedUser;
  // const { id: userId } = create({ id: reqUser.id }, IdParamsStruct);
  const { accessToken, newRefreshToken } = await userService.refreshToken(reqUser.id);
  res.cookie(REFRESH_tOKEN_STRING, newRefreshToken, {
    path: '/auth/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
  res.json({ accessToken });
}
