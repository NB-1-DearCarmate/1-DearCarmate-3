import { RequestHandler } from 'express';
import companyService from '../services/companyService';

export const postCompany: RequestHandler = async (req, res, next) => {
  const { companyName, companyCode } = req.body;

  const company = await companyService.createCompany({ companyName, companyCode });

  res.status(201).json(company);
};
