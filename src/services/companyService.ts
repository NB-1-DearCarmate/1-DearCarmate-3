import companyRepository from '../repositories/companyRepository';
import { Prisma } from '@prisma/client';

async function createCompany(company: { companyName: string; companyCode: string }) {
  const { companyName, companyCode } = company;

  const createdCompany = await companyRepository.create({ companyName, companyCode });

  return {
    ...createdCompany,
    userCount: 0,
  };
}

async function getByName(companyName: string) {
  const company = await companyRepository.findByName(companyName);
  return company;
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

  const formatted = companies.map(({ _count, ...company }) => ({
    ...company,
    userCount: _count.users,
  }));

  return {
    currentPage: page,
    totalPages: Math.ceil(totalItemCount / pageSize),
    totalItemCount,
    data: formatted,
  };
}

export default {
  createCompany,
  getByName,
  getEntityName,
  getCompanies,
};
