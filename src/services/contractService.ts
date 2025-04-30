import prisma from '../config/prismaClient';
import { assert } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import { CONTRACT_STATUS, Prisma } from '@prisma/client';
import { PageParamsType } from '../structs/commonStructs';
import contractRepository from '../repositories/contractRepository';
import { ResponseContractDcmtDTO, ContractWithRelations } from '../lib/dtos/contractDTO';

type CreateContractData = {
  customerId: number;
  carId: number;
  userId: number;
  companyId: number;
  contractPrice: number;
  meetings: { time: string }[];
};

export const createContractService = async (data: CreateContractData) => {
  assert(data, ContractCreateStruct);
  const { customerId, carId, userId, companyId, contractPrice, meetings } = data;

  const contract = await prisma.contract.create({
    data: {
      customerId,
      carId,
      userId,
      companyId,
      contractPrice,
      status: 'CONTRACT_PREPARING',
      meetings: {
        create: meetings,
      },
    },
    include: {
      meetings: true,
    },
  });

  return contract;
};

export const updateContractService = async (id: number, data: any) => {
  const { meetings, ...contractData } = data;

  const updatedContract = await prisma.contract.update({
    where: { id },
    data: {
      customerId: contractData.customerId,
      carId: contractData.carId,
      userId: contractData.userId,
      companyId: contractData.companyId,
      contractPrice: contractData.contractPrice,
      status: contractData.status,
      resolutionDate: contractData.resolutionDate,
      ...(meetings && {
        meetings: {
          deleteMany: {},
          create: meetings,
        },
      }),
    },
    include: {
      meetings: true,
    },
  });

  return updatedContract;
};
export const getAllContractsService = async () => {
  const contracts = await prisma.contract.findMany({
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

  return contracts;
};

export const getContractByIdService = async (id: number) => {
  const contract = await prisma.contract.findUnique({
    where: { id },
    include: {
      customer: true,
      car: true,
      user: true,
      meetings: true,
      contractDocuments: true,
    },
  });

  return contract;
};

export const deleteContractService = async (id: number) => {
  return await prisma.contract.delete({
    where: { id },
  });
};

export const updateContractStatusService = async (
  id: number,
  status: CONTRACT_STATUS,
  resolutionDate?: Date | null,
) => {
  return await prisma.contract.update({
    where: { id },
    data: {
      status,
      resolutionDate: resolutionDate ?? null,
    },
  });
};

export const getCustomerDropdownService = async (companyId: number) => {
  return await prisma.customer.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getUserDropdownService = async (companyId: number) => {
  return await prisma.user.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getCarDropdownService = async (companyId: number) => {
  return await prisma.car.findMany({
    where: { companyId },
    select: {
      id: true,
      carNumber: true,
    },
  });
};

export async function getContractListWithDcmt(
  companyId: number,
  { page, pageSize, searchBy, keyword }: PageParamsType,
) {
  let prismaParams: {
    skip: number;
    take: number;
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
    where: Prisma.ContractWhereInput;
  } = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      contractDocuments: true,
      user: true,
      car: {
        include: {
          carModel: true,
        },
      },
      customer: true,
    },
    where: {
      companyId: companyId,
      contractDocuments: {
        some: {},
      },
    },
  };

  let prismaWhereCondition: Prisma.ContractWhereInput = {};

  if (searchBy && keyword) {
    switch (searchBy) {
      case 'userName':
        prismaWhereCondition = {
          user: {
            name: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
        };
        break;
      case 'carNumber':
        prismaWhereCondition = {
          car: {
            carNumber: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
        };
        break;
      case 'contractName':
        prismaWhereCondition = {
          OR: [
            {
              car: {
                carModel: {
                  model: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              customer: {
                name: {
                  contains: keyword,
                  mode: 'insensitive',
                },
              },
            },
          ],
        };
        break;
    }
  }

  prismaParams = {
    ...prismaParams,
    where: {
      ...prismaParams.where,
      ...prismaWhereCondition,
    },
  };

  console.log(prismaParams);
  const contracts = await contractRepository.findManyWithDcmt(prismaParams);
  const totalItemCount = await contractRepository.getCount({ where: prismaParams.where });

  return { contracts, page, pageSize, totalItemCount };
}

export async function getContractDraft(companyId: number) {
  let prismaParams: {
    include: {
      car: {
        include: {
          carModel: true;
        };
      };
      customer: true;
    };
    where: Prisma.ContractWhereInput;
  } = {
    include: {
      car: {
        include: {
          carModel: true,
        },
      },
      customer: true,
    },
    where: {
      companyId: companyId,
      status: CONTRACT_STATUS.CONTRACT_SUCCESS,
    },
  };

  return await contractRepository.findManyDraft(prismaParams);
}

export function getEntityName() {
  return contractRepository.getEntityName();
}
