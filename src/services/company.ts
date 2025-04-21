import { create } from '../repositories/company';

export async function createCompany(company: { name: string; code: string }) {
  const { name, code } = company;

  const createdCompany = await create({ name, code });

  return createdCompany;
}
