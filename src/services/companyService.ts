import { ResponseCompanyDTO } from '../lib/dtos/companyDTO';
import companyRepository from '../repositories/companyRepository';
import { PageParamsType } from '../structs/commonStructs';
import { CreateCompanyBodyType, PatchCompanyBodyType } from '../structs/companyStructs';
import NotFoundError from '../lib/errors/NotFoundError';
import { buildSearchCondition } from '../lib/searchCondition';

async function createCompany(company: CreateCompanyBodyType) {
  const createdCompany = await companyRepository.create(company);
  return new ResponseCompanyDTO(createdCompany);
}

async function updateCompany(companyId: number, body: PatchCompanyBodyType) {
  const updatedCompany = await companyRepository.update(companyId, body);
  return new ResponseCompanyDTO(updatedCompany);
}

async function getByName(companyName: string) {
  const company = await companyRepository.findByName(companyName);
  if (!company) {
    throw new NotFoundError('Company', companyName);
  }
  return company;
}

async function getCompanies(params: PageParamsType) {
  const searchCondition = buildSearchCondition(params, ['companyName']);
  const where = searchCondition.whereCondition;
  const prismaParams = {
    ...searchCondition.pageCondition,
    where,
  };

  const companies = await companyRepository.getList(prismaParams);
  const totalItemCount = await companyRepository.getCount({
    where,
  });

  return {
    totalItemCount,
    companies,
  };
}

async function deleteCompany(companyId: number) {
  return await companyRepository.deleteById(companyId);
}

export default {
  createCompany,
  updateCompany,
  getByName,
  getCompanies,
  deleteCompany,
};
