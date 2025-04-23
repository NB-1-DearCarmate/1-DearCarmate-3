import express from 'express';
import { withAsync } from '../lib/withAsync';
import { postCompany, getCompanyList } from '../controllers/company';

const companyRouter = express.Router();

companyRouter.get('/', withAsync(getCompanyList));
companyRouter.post('/', withAsync(postCompany));

export default companyRouter;
