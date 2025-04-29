import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(data: Prisma.CustomerCreateInput) {
  return await prisma.customer.create({
    data,
  });
}

async function getList(params: Prisma.CustomerFindManyArgs) {
  return await prisma.customer.findMany({
    ...params,
    include: {
      _count: {
        select: { contracts: true },
      },
    },
  });
}

async function getCount(params: Prisma.CustomerCountArgs) {
  return await prisma.customer.count({
    ...params,
  });
}

export default {
  create,
  getList,
  getCount,
};
