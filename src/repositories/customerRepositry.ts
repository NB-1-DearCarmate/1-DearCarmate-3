import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(data: Prisma.CustomerCreateInput) {
  return await prisma.customer.create({
    data,
  });
}

async function createMany(data: Prisma.CustomerCreateManyInput[]) {
  return await prisma.customer.createMany({
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

async function getById(id: number) {
  return await prisma.customer.findUniqueOrThrow({
    where: { id },
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

async function update(id: number, data: Prisma.CustomerUpdateInput) {
  return await prisma.customer.update({
    where: { id },
    data,
  });
}

async function deleteById(id: number) {
  return await prisma.customer.delete({
    where: { id },
  });
}

function getEntityName() {
  return prisma.user.getEntityName();
}

export default {
  create,
  createMany,
  getList,
  getById,
  getCount,
  update,
  deleteById,
  getEntityName,
};
