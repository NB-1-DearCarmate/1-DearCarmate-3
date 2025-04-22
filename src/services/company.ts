import { create } from '../repositories/company';

export async function createCompany(company: { companyName: string; companyCode: string }) {
  const { companyName, companyCode } = company;

  const createdCompany = await create({ companyName, companyCode });

  return createdCompany;
}
