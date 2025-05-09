import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';
import contractRepository from '../repositories/contractRepository';

async function getRevenueByFlag(
  companyId: number,
  isThisMonth: boolean,
  tx: Prisma.TransactionClient,
) {
  const now = new Date();

  let startDate: Date;
  let endDate: Date;

  if (isThisMonth) {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1); // 이번 달 1일
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // 다음 달 1일
  } else {
    startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // 지난 달 1일
    endDate = new Date(now.getFullYear(), now.getMonth(), 1); // 이번 달 1일
  }

  const result = await contractRepository.getContractPriceSum(companyId, startDate, endDate, tx);

  return result._sum.contractPrice || 0;
}

async function getContractSummary(companyId: number, tx: Prisma.TransactionClient) {
  const contracts = await contractRepository.getContractSummary(companyId, tx);

  const totalSuccessCount = contracts.length;

  const contractCountByCarType: Record<string, number> = {};
  const contractPriceByCarType: Record<string, number> = {};

  for (const contract of contracts) {
    const type = contract.car.carModel.carType.type;
    const price = Number(contract.contractPrice);

    contractCountByCarType[type] = (contractCountByCarType[type] ?? 0) + 1;
    contractPriceByCarType[type] = (contractPriceByCarType[type] ?? 0) + price;
  }

  return {
    totalSuccessCount,
    contractCountByCarType,
    contractPriceByCarType,
  };
}

async function getDashBoardData(companyId: number) {
  return await prisma.$transaction(async (tx) => {
    const thisMonthRevenue = await getRevenueByFlag(companyId, true, tx); // 이번 달
    const lastMonthRevenue = await getRevenueByFlag(companyId, false, tx); // 지난 달

    const inProgressContractCount = await contractRepository.getInProgressContractCount(
      companyId,
      tx,
    );

    const { totalSuccessCount, contractCountByCarType, contractPriceByCarType } =
      await getContractSummary(companyId, tx);

    return {
      thisMonthRevenue,
      lastMonthRevenue,
      inProgressContractCount,
      totalSuccessCount,
      contractCountByCarType,
      contractPriceByCarType,
    };
  });
}

export default {
  getDashBoardData,
};
