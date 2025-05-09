import { CONTRACT_STATUS, Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';
import { PageParamsType, SearchParamsType } from '../structs/commonStructs';
import { ContractCreateType, ContractUpdateType } from '../structs/contractStructs';

async function create(
  data: {
    customerId: number;
    carId: number;
    contractPrice?: number;
    meetings: { date: string }[];
  },
  userId: number,
  companyId: number,
) {
  const contractPrice = data.contractPrice ?? 0;
  const convertedData = {
    ...data,
    contractPrice,
    userId,
    companyId,
    meetings: data.meetings.map(({ date }) => ({ time: new Date(date) })),
  };

  return await prisma.contract.create({
    data: {
      ...convertedData,
      status: CONTRACT_STATUS.VEHICLE_CHECKING,
      meetings: {
        create: convertedData.meetings,
      },
    },
    include: {
      meetings: true,
      user: { select: { id: true, name: true } },
      customer: { select: { id: true, name: true } },
      car: {
        select: {
          id: true,
          carModel: { select: { model: true } },
        },
      },
      contractDocuments: true,
    },
  });
}

async function update(id: number, contractData: ContractUpdateType) {
  const { meetings: dateMeetings, status: stringStatus, contractDocuments, ...rest } = contractData;
  const meetings = dateMeetings?.map(({ date }) => ({ time: new Date(date) }));
  let status: CONTRACT_STATUS | undefined = undefined;
  switch (stringStatus) {
    case 'CONTRACT_PREPARING':
      status = CONTRACT_STATUS.CONTRACT_PREPARING;
      break;
    case 'CONTRACT_SUCCESS':
      status = CONTRACT_STATUS.CONTRACT_SUCCESS;
      break;
    case 'CONTRACT_FAILED':
      status = CONTRACT_STATUS.CONTRACT_FAILED;
      break;
    case 'PRICE_CHECKING':
      status = CONTRACT_STATUS.PRICE_CHECKING;
      break;
    case 'VEHICLE_CHECKING':
      status = CONTRACT_STATUS.VEHICLE_CHECKING;
      break;
  }

  return await prisma.contract.update({
    where: { id },
    data: {
      ...rest,
      status,
      ...(meetings && {
        meetings: {
          deleteMany: {},
          create: meetings,
        },
      }),
      ...(contractDocuments && {
        contractDocuments: {
          set: contractDocuments.map((doc) => ({ id: doc.id })),
        },
      }),
    },
    include: {
      meetings: true,
      contractDocuments: true, // 이메일 전송용 포함
      customer: true, // 이메일 주소 접근용 포함
      user: true,
      car: {
        include: {
          carModel: true,
        },
      },
    },
  });
}

async function findMany({ searchBy, keyword }: SearchParamsType, companyId: number) {
  let where: Prisma.ContractWhereInput = {
    companyId,
  };

  if (searchBy && keyword) {
    switch (searchBy) {
      case 'userName':
        where.user = { name: { contains: keyword, mode: 'insensitive' } };
        break;
      case 'customerName':
        where.customer = { name: { contains: keyword, mode: 'insensitive' } };
    }
  }

  const contracts = await prisma.contract.findMany({
    where,
    include: {
      customer: true,
      car: {
        include: {
          carModel: true,
        },
      },
      user: true,
      meetings: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return contracts;
}

async function findById(id: number) {
  return await prisma.contract.findUnique({
    where: { id },
    include: {
      customer: true,
      car: {
        include: {
          carModel: true,
        },
      },
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
      email: true,
    },
  });
}

async function findUserDropdown(companyId: number) {
  return await prisma.user.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

async function findCarDropdown(companyId: number) {
  return await prisma.car.findMany({
    where: { companyId },
    select: {
      id: true,
      carNumber: true,
      carModel: {
        select: {
          model: true,
        },
      },
    },
  });
}

// develop의 계약 문서 포함 필터링 리스트
async function findManyWithDoc(
  companyId: number,
  { page, pageSize, searchBy, keyword }: PageParamsType,
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

  const contracts = await prisma.contract.findMany({
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
  const totalItemCount = await getCount({ where });

  return { contracts, totalItemCount };
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
  findMany,
  findById,
  deleteById,
  updateStatus,
  findCustomerDropdown,
  findUserDropdown,
  findCarDropdown,
  findManyWithDoc,
  findManyDraft,
  getCount,
  findCompanyIdbycontractId,
  getContractPriceSum,
  getInProgressContractCount,
  getContractSummary,
};
