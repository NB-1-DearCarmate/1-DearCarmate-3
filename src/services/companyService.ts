import companyRepository from '../repositories/companyRepository';

async function createCompany(company: { companyName: string; companyCode: string }) {
  const { companyName, companyCode } = company;

  const createdCompany = await companyRepository.create({ companyName, companyCode });

  return createdCompany;
}

async function getByName(companyName: string) {
  const company = await companyRepository.findByName(companyName);
  return company;
}

function getEntityName() {
  return companyRepository.getEntityName();
}

export default {
  createCompany,
  getByName,
  getEntityName,
};
