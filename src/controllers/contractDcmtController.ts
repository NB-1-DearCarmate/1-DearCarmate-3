import { create } from 'superstruct';
import userService from '../services/userService';
import {
  CreateUserBodyStruct,
  DeleteUserParamStruct,
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
import { getContractListWithDcmt } from '../services/contractService';
import { PageParamsStruct } from '../structs/commonStructs';
import { ResponseContractDcmtDTO } from '../lib/dtos/contractDTO';

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

export const getDocumentList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  const data = create(req.query, PageParamsStruct);
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const { contracts, page, pageSize, totalItemCount } = await getContractListWithDcmt(
    userCompanyId,
    data,
  );
  res.send(new ResponseContractDcmtDTO(contracts, page, pageSize, totalItemCount));
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
  res.status(204).send();
};

export const deleteUser: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const { userId } = create(req.params, DeleteUserParamStruct);
  await userService.deleteUser(userId);
  res.status(204).send();
};
