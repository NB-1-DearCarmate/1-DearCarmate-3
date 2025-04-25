import prisma from "../config/prismaClient";
import { assert } from "superstruct";
import { ContractCreateStruct } from "../structs/contractStructs";
import { CONTRACT_STATUS } from "@prisma/client";

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
      status: "CONTRACT_PREPARING",
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
        createdAt: "desc",
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
    resolutionDate?: Date | null
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
  