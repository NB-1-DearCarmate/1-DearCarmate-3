import { RequestHandler } from 'express';
import companyService from '../services/companyService';
import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
import UnauthError from '../lib/errors/UnauthError';
import userService from '../services/userService';
import { PageParamsStruct } from '../structs/commonStructs';
import { create } from 'superstruct';
import {
  CompanyIdParamStruct,
  CreateCompanyBodyStruct,
  PatchCompanyBodyStruct,
} from '../structs/companyStructs';

export const postCompany: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }

  const data = create(req.body, CreateCompanyBodyStruct);
  const company = await companyService.createCompany(data);
  res.status(201).send(company);
};

export const getCompanyList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const data = create(req.query, PageParamsStruct);
  const companies = await companyService.getCompanies(data);
  res.send(companies);
};

export const getCompanyUsers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }

  const data = create(req.query, PageParamsStruct);
  const users = await userService.getUsers(data);
  res.send(users);
};

export const patchCompany: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }
  const { companyId } = create(req.params, CompanyIdParamStruct);
  const data = create(req.query, PatchCompanyBodyStruct);
  const company = await companyService.updateCompany(companyId, data);
  res.status(200).json(company);
};
