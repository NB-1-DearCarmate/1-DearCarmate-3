import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

export async function create(company: Prisma.CompanyCreateInput) {
  return await prisma.company.create({
    data: company,
  });
}

export async function getList(params: Prisma.CompanyFindManyArgs) {
  return await prisma.company.findMany({
    ...params,
    include: {
      _count: {
        select: { users: true },
      },
    },
  });
}

export async function getCount(params: Prisma.CompanyCountArgs) {
  return await prisma.company.count({
    ...params,
  });
}
