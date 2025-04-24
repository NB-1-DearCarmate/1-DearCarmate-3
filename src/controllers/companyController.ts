import { RequestHandler } from 'express';
import companyService from '../services/companyService';
import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
import UnauthError from '../lib/errors/UnauthError';
import userService from '../services/userService';

export const postCompany: RequestHandler = async (req, res, next) => {
  const { companyName, companyCode } = req.body;
  const company = await companyService.createCompany({ companyName, companyCode });
  res.status(201).json(company);
};

export const getCompanyList: RequestHandler = async (req, res, next) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
  const searchBy = (req.query.searchBy as string) || '';
  const keyword = (req.query.keyword as string) || '';
  const companies = await companyService.getCompanies({ page, pageSize, searchBy, keyword });
  res.status(200).json(companies);
};

export const getCompanyUsers: RequestHandler = async (req, res, next) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
  const searchBy = (req.query.searchBy as string) || '';
  const keyword = (req.query.keyword as string) || '';
  const reqUser = req.user as OmittedUser;

  if (reqUser.role !== USER_ROLE.ADMIN) {
    throw new UnauthError();
  }

  const users = await userService.getUsers({
    page,
    pageSize,
    searchBy,
    keyword,
  });
  res.status(200).json(users);
};

export const patchCompany: RequestHandler = async (req, res, next) => {
  const companyId = parseInt(req.params.companyId as string, 10);
  const { companyName, companyCode } = req.body;
  const company = await companyService.updateCompany(companyId, { companyName, companyCode });
  res.status(200).json(company);
};
