import { Company } from '@prisma/client';

export class ResponseCompanyDTO {
  id: number;
  companyName: string;
  companyCode: string;
  userCount: number;
  constructor(company: Company & { _count?: { users: number } }) {
    this.id = company.id;
    this.companyName = company.companyName;
    this.companyCode = company.companyCode;
    this.userCount = company._count?.users ?? 0;
  }
}

export class ResponseCompanyListDTO {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: ResponseCompanyDTO[];

  constructor(
    page: number,
    pageSize: number,
    result: {
      totalItemCount: number;
      companies: (Company & { _count?: { users: number } })[];
    },
  ) {
    this.currentPage = page;
    this.totalPages = Math.ceil(result.totalItemCount / pageSize);
    this.totalItemCount = result.totalItemCount;
    this.data = result.companies.map((company) => new ResponseCompanyDTO(company));
  }
}
