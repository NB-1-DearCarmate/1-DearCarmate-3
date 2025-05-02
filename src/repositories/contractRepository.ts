import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(contract: Prisma.ContractUncheckedCreateInput) {
  return await prisma.contract.create({
    data: contract,
  });
}

async function update(id: number, data: Prisma.ContractUncheckedUpdateInput) {
  return await prisma.contract.update({
    where: {
      id,
    },
    data: data,
  });
}

async function remove(id: number) {
  return await prisma.contract.delete({
    where: {
      id: id,
    },
  });
}

async function findById(id: number) {
  return await prisma.contract.findUnique({
    where: {
      id,
    },
  });
}

async function findMany(params: Prisma.ContractFindManyArgs) {
  return await prisma.contract.findMany({
    ...params,
  });
}

async function findManyWithDcmt(
  params: Omit<Prisma.ContractFindManyArgs, 'include'> & {
    include: {
      contractDocuments: true;
      user: true;
      car: {
        include: {
          carModel: true;
        };
      };
      customer: true;
    };
  },
) {
  return await prisma.contract.findMany(params);
}

async function findManyDraft(
  params: Omit<Prisma.ContractFindManyArgs, 'include'> & {
    include: {
      car: {
        include: {
          carModel: true;
        };
      };
      customer: true;
    };
  },
) {
  return await prisma.contract.findMany(params);
}

async function findCompanyIdbycontractId(contractId: number) {
  return await prisma.contract.findUnique({
    where: {
      id: contractId,
    },
    select: {
      companyId: true,
    },
  });
}

async function getCount(params: Prisma.ContractCountArgs) {
  return await prisma.contract.count({
    ...params,
  });
}

export default {
  create,
  update,
  remove,
  findById,
  findMany,
  findManyWithDcmt,
  findManyDraft,
  findCompanyIdbycontractId,
  getCount,
};
