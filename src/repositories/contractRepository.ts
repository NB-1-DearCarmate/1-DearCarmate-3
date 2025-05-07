import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(data: {
  customerId: number;
  carId: number;
  userId: number;
  companyId: number;
  contractPrice: number;
  meetings: { time: string }[];
}) {
  return await prisma.contract.create({
    data: {
      ...data,
      status: 'CONTRACT_PREPARING',
      meetings: {
        create: data.meetings,
      },
    },
    include: {
      meetings: true,
    },
  });
}

async function update(id: number, contractData: any, meetings?: { time: string }[]) {
  return await prisma.contract.update({
    where: { id },
    data: {
      ...contractData,
      ...(meetings && {
        meetings: {
          deleteMany: {},
          create: meetings,
        },
      }),
    },
    include: {
      meetings: true,
      contractDocuments: true, // 이메일 전송용 포함
      customer: true, // 이메일 주소 접근용 포함
    },
  });
}

async function findAll() {
  return await prisma.contract.findMany({
    include: {
      customer: true,
      car: true,
      user: true,
      meetings: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function findById(id: number) {
  return await prisma.contract.findUnique({
    where: { id },
    include: {
      customer: true,
      car: true,
      user: true,
      meetings: true,
      contractDocuments: true,
    },
  });
}

async function deleteById(id: number) {
  return await prisma.contract.delete({
    where: { id },
  });
}

async function updateStatus(
  id: number,
  status: Prisma.ContractUpdateInput['status'],
  resolutionDate?: Date | null,
) {
  return await prisma.contract.update({
    where: { id },
    data: {
      status,
      resolutionDate: resolutionDate ?? null,
    },
  });
}

async function findCustomerDropdown(companyId: number) {
  return await prisma.customer.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
    },
  });
}

async function findUserDropdown(companyId: number) {
  return await prisma.user.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
    },
  });
}

async function findCarDropdown(companyId: number) {
  return await prisma.car.findMany({
    where: { companyId },
    select: {
      id: true,
      carNumber: true,
    },
  });
}

// develop의 계약 문서 포함 필터링 리스트
async function findManyWithDcmt(
  companyId: number,
  {
    page,
    pageSize,
    searchBy,
    keyword,
  }: {
    page: number;
    pageSize: number;
    searchBy?: string;
    keyword?: string;
  },
) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  let where: Prisma.ContractWhereInput = {
    companyId,
    contractDocuments: { some: {} },
  };

  if (searchBy && keyword) {
    switch (searchBy) {
      case 'userName':
        where.user = { name: { contains: keyword, mode: 'insensitive' } };
        break;
      case 'carNumber':
        where.car = { carNumber: { contains: keyword, mode: 'insensitive' } };
        break;
      case 'contractName':
        where.OR = [
          { car: { carModel: { model: { contains: keyword, mode: 'insensitive' } } } },
          { customer: { name: { contains: keyword, mode: 'insensitive' } } },
        ];
        break;
    }
  }

  const result = await prisma.contract.findMany({
    skip,
    take,
    where,
    include: {
      contractDocuments: true,
      user: true,
      car: { include: { carModel: true } },
      customer: true,
    },
  });

  return result;
}

// develop의 계약 드래프트 리스트
async function findManyDraft(companyId: number) {
  return await prisma.contract.findMany({
    where: {
      companyId,
      status: 'CONTRACT_SUCCESS',
    },
    include: {
      car: { include: { carModel: true } },
      customer: true,
    },
  });
}

// develop의 count, 통계 관련 쿼리
async function getCount(params: Prisma.ContractCountArgs) {
  return await prisma.contract.count(params);
}

async function findCompanyIdbycontractId(contractId: number) {
  return await prisma.contract.findUnique({
    where: { id: contractId },
    select: { companyId: true },
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
  findAll,
  findById,
  deleteById,
  updateStatus,
  findCustomerDropdown,
  findUserDropdown,
  findCarDropdown,
  findManyWithDcmt,
  findManyDraft,
  getCount,
  findCompanyIdbycontractId,
  getContractPriceSum,
  getInProgressContractCount,
  getContractSummary,
};
