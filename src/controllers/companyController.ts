import { RequestHandler } from 'express';
import companyService from '../services/companyService';

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
