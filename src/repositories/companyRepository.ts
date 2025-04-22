import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(company: Prisma.CompanyCreateInput) {
  return await prisma.company.create({
    data: company,
  });
}

async function findByName(companyName: string) {
  return await prisma.company.findUnique({
    where: {
      companyName,
    },
  });
}

function getEntityName() {
  return prisma.company.getEntityName();
}

export default {
  create,
  findByName,
  getEntityName,
};
