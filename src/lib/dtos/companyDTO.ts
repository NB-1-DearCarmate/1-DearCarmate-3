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
