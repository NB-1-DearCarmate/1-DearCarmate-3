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

async function findManyWithDoc(
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

async function getContractPriceSum(
  companyId: number,
  startDate: Date,
  endDate: Date,
  tx: Prisma.TransactionClient,
) {
  return await tx.contract.aggregate({
    _sum: { contractPrice: true },
    where: {
      companyId,
      status: 'CONTRACT_SUCCESS',
      resolutionDate: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}
async function getInProgressContractCount(companyId: number, tx: Prisma.TransactionClient) {
  return await tx.contract.count({
    where: {
      companyId,
      status: {
        notIn: ['CONTRACT_SUCCESS', 'CONTRACT_FAILED'],
      },
    },
  });
}

async function getContractSummary(companyId: number, tx: Prisma.TransactionClient) {
  return await tx.contract.findMany({
    where: {
      companyId,
      status: 'CONTRACT_SUCCESS',
    },
    select: {
      contractPrice: true,
      car: {
        select: {
          carModel: {
            select: {
              carType: {
                select: {
                  type: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export default {
  create,
  update,
  remove,
  findById,
  findMany,
  findManyWithDoc,
  findManyDraft,
  findCompanyIdbycontractId,
  getCount,
  getContractPriceSum,
  getInProgressContractCount,
  getContractSummary,
};
