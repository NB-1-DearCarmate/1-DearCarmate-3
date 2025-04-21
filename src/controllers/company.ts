import { RequestHandler } from 'express';
import { createCompany } from '../services/company';

export const postCompany: RequestHandler = async (req, res, next) => {
  const { name, code } = req.body;

  const company = await createCompany({ name, code });

  res.status(201).json(company);
};
