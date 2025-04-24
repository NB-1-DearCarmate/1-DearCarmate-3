import { ResponseCompanyDTO } from '../lib/dtos/companyDTO';
import companyRepository from '../repositories/companyRepository';
import { Prisma } from '@prisma/client';

async function createCompany(company: { companyName: string; companyCode: string }) {
  const { companyName, companyCode } = company;
  const createdCompany = await companyRepository.create({ companyName, companyCode });
  return new ResponseCompanyDTO(createdCompany);
}

async function updateCompany(companyId: number, body: Prisma.CompanyUpdateInput) {
  const updatedCompany = await companyRepository.update(companyId, body);
  return new ResponseCompanyDTO(updatedCompany);
}

async function getByName(companyName: string) {
  return await companyRepository.findByName(companyName);
}

function getEntityName() {
  return companyRepository.getEntityName();
}

async function getCompanies({
  page,
  pageSize,
  searchBy,
  keyword,
}: {
  page: number;
  pageSize: number;
  searchBy?: string;
  keyword?: string;
}) {
  let prismaParams: {
    skip: number;
    take: number;
    where?: Prisma.CompanyWhereInput;
  } = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
  let prismaWhereCondition: Prisma.CompanyWhereInput = {};
  if (searchBy && keyword) {
    switch (searchBy) {
      case 'companyName':
        prismaWhereCondition = {
          companyName: {
            contains: keyword,
          },
        };
        break;
    }
  }
  prismaParams = {
    ...prismaParams,
    where: prismaWhereCondition,
  };

  const companies = await companyRepository.getList(prismaParams);
  const totalItemCount = await companyRepository.getCount({
    where: prismaWhereCondition,
  });
<<<<<<< HEAD
=======

  const formatted = companies.map(({ _count, ...company }) => ({
    ...company,
    userCount: _count.users,
  }));
>>>>>>> 570f63891206dd46c86e2ca621deb1da95d5f0e9

  return {
    currentPage: page,
    totalPages: Math.ceil(totalItemCount / pageSize),
    totalItemCount,
    data: companies.map((company) => new ResponseCompanyDTO(company)),
  };
}

export default {
  createCompany,
  updateCompany,
  getByName,
  getEntityName,
  getCompanies,
};
