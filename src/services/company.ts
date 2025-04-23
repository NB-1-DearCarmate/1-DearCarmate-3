import { CompanySearchField } from '../../types/company';
import { create, getList, getCount } from '../repositories/company';

export async function createCompany(company: { companyName: string; companyCode: string }) {
  const { companyName, companyCode } = company;

  const createdCompany = await create({ companyName, companyCode });

  return createdCompany;
}

export async function getCompanies({
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
    where?: Partial<Record<CompanySearchField, { contains: string }>>;
    /* 단순히 <Record<CompanySearchField, { contains: string }>> 일경우
    where:{
      CompanySearchField[0]  : { contains: string },
      CompanySearchField[1]  : { contains: string },
      CompanySearchField[...]: { contains: string }} 처럼
      CompanySearchField에 존재하는 모든 필드가 포함되어야함
      결국 이 필드중 하나만있어야하니까 Partial로 감싸줌
      (이게다 동적 Key Access가 필요한 searchBy 때문)
    */
  } = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };

  if (searchBy && keyword) {
    switch (searchBy) {
      case 'companyName':
        prismaParams = {
          ...prismaParams,
          where: {
            [searchBy]: {
              contains: keyword,
            },
          },
        };
        break;
    }
  }

  const companies = await getList(prismaParams);
  const totalItemCount = await getCount({
    where: searchBy && keyword ? { [searchBy]: { contains: keyword } } : {},
  });
  // 처음엔 prismaParams.where 변수로 getCount에 넣어주려고했으나
  // 타입추론이안되는문제로 getList 와 getCount가 일관성이 떨어지는 코드가 되버림
  // 고칠필요가있어보임..

  // _count 제거하고 userCount만 남김
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
