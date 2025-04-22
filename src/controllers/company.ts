import { RequestHandler } from 'express';
import { createCompany } from '../services/company';

export const postCompany: RequestHandler = async (req, res, next) => {
  const { companyName, companyCode } = req.body;

  const company = await createCompany({ companyName, companyCode });

  res.status(201).json(company);
};
