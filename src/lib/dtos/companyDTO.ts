import { Company, User } from '@prisma/client';

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

export class ResponseCompanyUserDTO {
  id: number;
  name: string;
  email: string;
  employeeNumber: string;
  phoneNumber: string;
  company: {
    companyName: string;
  };
  constructor(user: User & { company: { companyName: string } }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.employeeNumber = user.employeeNumber;
    this.phoneNumber = user.phoneNumber;
    this.company = {
      companyName: user.company.companyName,
    };
  }
}

export class ResponseCompanyUserListDTO {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: ResponseCompanyUserDTO[];

  constructor(
    page: number,
    pageSize: number,
    users: (User & { company: { companyName: string } })[],
    totalItemCount: number,
  ) {
    this.currentPage = page;
    this.totalPages = Math.ceil(totalItemCount / pageSize);
    this.totalItemCount = totalItemCount;
    this.data = users.map((user) => new ResponseCompanyUserDTO(user));
  }
}
