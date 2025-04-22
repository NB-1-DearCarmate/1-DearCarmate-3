import { create } from '../repositories/company';

export async function createCompany(company: { companyName: string; companyCode: string }) {
  const { companyName: name, companyCode: code } = company;

  const createdCompany = await create({ name, code });

  return createdCompany;
}
