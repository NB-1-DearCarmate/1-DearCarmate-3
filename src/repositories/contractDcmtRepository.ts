import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(contractDocument: Prisma.ContractDocumentUncheckedCreateInput) {
  return await prisma.contractDocument.create({
    data: contractDocument,
  });
}

async function update(id: number, data: Prisma.ContractDocumentUncheckedUpdateInput) {
  return await prisma.contractDocument.update({
    where: {
      id,
    },
    data: data,
  });
}

async function remove(id: number) {
  return await prisma.contractDocument.delete({
    where: {
      id: id,
    },
  });
}

async function findById(id: number) {
  return await prisma.contractDocument.findUnique({
    where: {
      id,
    },
  });
}

async function findMany(params: Prisma.ContractDocumentFindManyArgs) {
  return await prisma.contractDocument.findMany({
    ...params,
  });
}

async function getCount(params: Prisma.ContractDocumentCountArgs) {
  return await prisma.contractDocument.count({
    ...params,
  });
}
function getEntityName() {
  return prisma.contractDocument.getEntityName();
}

export default {
  create,
  update,
  remove,
  findById,
  findMany,
  getCount,
  getEntityName,
};
