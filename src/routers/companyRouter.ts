import express from 'express';
import { withAsync } from '../lib/withAsync';
import { postCompany } from '../controllers/companyController';

const companyRouter = express.Router();

companyRouter.post('/', withAsync(postCompany));

export default companyRouter;
