import { create } from 'superstruct';
import userService from '../services/exampleService';
import { IdParamsStruct } from '../structs/commonStructs';
import {
  CreatePasswordStruct,
  CreateUserBodyStruct,
  UpdateUserBodyStruct,
} from '../structs/exampleStructs';
import { Request, Response } from 'express';
import { UserWithId } from '../../types/AuthedUser';
import { NONE_STRING, REFRESH_STRING, REFRESH_tOKEN_STRING } from '../config/constants';

export async function createUser(req: Request, res: Response) {
  const data = create(req.body, CreateUserBodyStruct);
  const user = await userService.createUser(data);
  res.status(201).send(user);
}

export async function login(req: Request, res: Response) {
  const reqUser = req.user as UserWithId;
  const accessToken = userService.createToken(reqUser);
  const refreshToken = userService.createToken(reqUser, REFRESH_STRING);
  res.cookie(REFRESH_tOKEN_STRING, refreshToken, {
    path: '/users/token/refresh',
    httpOnly: true,
    sameSite: NONE_STRING,
    secure: false,
  });
  res.json({ accessToken });
}

export async function refreshToken(req: Request, res: Response) {
  const reqUser = req.user as UserWithId;
  const { id: userId } = create({ id: reqUser.id }, IdParamsStruct);
  const { accessToken, newRefreshToken } = await userService.refreshToken(userId);
  res.cookie(REFRESH_tOKEN_STRING, newRefreshToken, {
    path: '/users/token/refresh',
    httpOnly: true,
    sameSite: NONE_STRING,
    secure: false,
  });
  res.json({ accessToken });
}

export async function getInfo(req: Request, res: Response) {
  const reqUser = req.user as UserWithId;
  const { id: userId } = create({ id: reqUser.id }, IdParamsStruct);
  const user = await userService.getUserById(userId);
  res.send(user);
}

export async function editInfo(req: Request, res: Response) {
  const reqUser = req.user as UserWithId;
  const { id: userId } = create({ id: reqUser.id }, IdParamsStruct);
  const data = create(req.body, UpdateUserBodyStruct);
  const user = await userService.updateUser(userId, data);
  res.status(201).send(user);
}

export async function editPassword(req: Request, res: Response) {
  const reqUser = req.user as UserWithId;
  const { id: userId } = create({ id: reqUser.id }, IdParamsStruct);
  const { password: password } = create(req.body, CreatePasswordStruct);
  const user = await userService.updatePassword(userId, password);
  res.status(201).send(user);
}
