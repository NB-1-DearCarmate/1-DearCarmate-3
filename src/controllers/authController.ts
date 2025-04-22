import { create } from 'superstruct';
import userService from '../services/userService';
import { IdParamsStruct } from '../structs/commonStructs';
import { Request, Response } from 'express';
import { OmittedUser } from '../../types/OmittedUser';
import { REFRESH_tOKEN_STRING } from '../config/constants';
import { LoginResponseDTO } from '../lib/dtos/authDTO';
import { PrismaClient } from '@prisma/client';
import prisma from '../config/prismaClient';

export async function login(req: Request, res: Response) {
  const reqUser = req.user as OmittedUser;
  console.log(reqUser);
  const accessToken = userService.createToken(reqUser);
  const refreshToken = userService.createToken(reqUser, 'refresh');
  res.cookie(REFRESH_tOKEN_STRING, refreshToken, {
    path: '/auth/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
  const resultDTO = new LoginResponseDTO(reqUser, accessToken, refreshToken);
  res.json({ resultDTO });
}

export async function refreshToken(req: Request, res: Response) {
  const reqUser = req.user as OmittedUser;
  const { accessToken, newRefreshToken } = await userService.refreshToken(reqUser.id);
  res.cookie(REFRESH_tOKEN_STRING, newRefreshToken, {
    path: '/auth/refresh',
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  });
  res.json({ accessToken, refreshToken: newRefreshToken });
}
