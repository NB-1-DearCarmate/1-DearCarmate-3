import prisma from "../config/prismaClient";

type CreateContractData = {
  customerId: number;
  carId: number;
  userId: number;
  companyId: number;
  contractPrice: number;
  meetings: { time: string }[];
};

export const createContractService = async (data: CreateContractData) => {
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
