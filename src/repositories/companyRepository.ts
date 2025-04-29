import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(company: Prisma.CompanyCreateInput) {
  return await prisma.company.create({
    data: company,
  });
}

async function update(companyId: number, data: Prisma.CompanyUpdateInput) {
  return await prisma.company.update({
    data,
    where: {
      id: companyId,
    },
    include: {
      _count: {
        select: { users: true },
      },
    },
  });
}

async function findByName(companyName: string) {
  return await prisma.company.findUnique({
    where: {
      companyName,
    },
  });
}

async function getList(params: Prisma.CompanyFindManyArgs) {
  return await prisma.company.findMany({
    ...params,
    include: {
      _count: {
        select: { users: true },
      },
    },
  });
}

async function getCount(params: Prisma.CompanyCountArgs) {
  return await prisma.company.count({
    ...params,
  });
}

function getEntityName() {
  return prisma.company.getEntityName();
}

async function deleteById(companyId: number) {
  return await prisma.company.delete({
    where: {
      id: companyId,
    },
  });
}

export default {
  create,
  update,
  findByName,
  getList,
  getCount,
  getEntityName,
  deleteById,
};
