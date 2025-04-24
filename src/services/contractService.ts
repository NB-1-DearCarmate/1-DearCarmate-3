import prisma from "../config/prismaClient";
import { assert } from "superstruct";
import { ContractCreateStruct } from "../structs/contractStructs";

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
    const updatedContract = await prisma.contract.update({
      where: { id },
      data,
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
        createdAt: "desc", // 최신순
      },
    });
  
    return contracts;
  };