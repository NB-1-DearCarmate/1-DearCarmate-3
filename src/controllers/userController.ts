import { create } from 'superstruct';
import userService from '../services/userService';
import {
  CreateUserBodyStruct,
  DeleteUserBodyType,
  UpdateUserBodyStruct,
} from '../structs/userStructs';
import { RequestHandler } from 'express';
import { CreateUserDTO, ResponseUserDTO } from '../lib/dtos/userDTO';
import companyService from '../services/companyService';
import CommonError from '../lib/errors/CommonError';
import NotFoundError from '../lib/errors/NotFoundError';
import { OmittedUser } from '../../types/OmittedUser';
import { USER_ROLE } from '@prisma/client';
import UnauthError from '../lib/errors/UnauthError';

export const createUser: RequestHandler = async (req, res) => {
  const data = create(req.body, CreateUserBodyStruct);
  const company = await companyService.getByName(data.company);
  if (!company) {
    throw new NotFoundError(companyService.getEntityName(), data.company);
  }
  if (company.companyCode !== data.companyCode) {
    throw new CommonError('Company code is wrong', 404);
  }

  const user = await userService.createUser(new CreateUserDTO(data, company.id));
  res.status(201).send(new ResponseUserDTO(user));
};

export const getInfo: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const user = await userService.getUserById(reqUser.id);
  res.send(new ResponseUserDTO(user));
};

export const editInfo: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const data = create(req.body, UpdateUserBodyStruct);
  const user = await userService.updateUser(reqUser.id, data);
  res.status(201).send(new ResponseUserDTO(user));
};

export const withDraw: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  await userService.deleteUser(reqUser.id);
  res.status(204).send('유저 삭제 성공');
};

export const deleteUser: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const data = create(req.body, DeleteUserBodyType);
  await userService.deleteUser(data.userId);
  res.status(204).send('유저 삭제 성공');
};
