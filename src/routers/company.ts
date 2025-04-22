import express from 'express';
import { withAsync } from '../lib/withAsync';
import { postCompany } from '../controllers/company';

const companyRouter = express.Router();

companyRouter.post('/', withAsync(postCompany));

export default companyRouter;
