import { Decimal } from '@prisma/client/runtime/library';

interface CarTypeCountDTO {
  carType: string;
  count: number;
}

export class ResponseDashBoardDTO {
  monthlySales: number;
  lastMonthSales: number;
  growthRate: number;
  proceedingContractsCount: number;
  completedContractsCount: number;
  contractsByCarType: CarTypeCountDTO[];
  salesByCarType: CarTypeCountDTO[];

  constructor(data: {
    thisMonthRevenue: number | Decimal;
    lastMonthRevenue: number | Decimal;
    inProgressContractCount: number;
    totalSuccessCount: number;
    contractCountByCarType: Record<string, number>;
    contractPriceByCarType: Record<string, number | Decimal>;
  }) {
    const { thisMonthRevenue, lastMonthRevenue } = data;

    const thisRevenue = Number(thisMonthRevenue);
    const lastRevenue = Number(lastMonthRevenue);
    const growthRate =
      lastRevenue === 0 ? 0 : Math.round(((thisRevenue - lastRevenue) / lastRevenue) * 100);

    this.monthlySales = thisRevenue;
    this.lastMonthSales = lastRevenue;
    this.growthRate = growthRate;
    this.proceedingContractsCount = data.inProgressContractCount;
    this.completedContractsCount = data.totalSuccessCount;
    this.contractsByCarType = this.mapCarTypeCounts(data.contractCountByCarType);
    this.salesByCarType = this.mapCarTypeCounts(data.contractPriceByCarType);
  }

  private mapCarTypeCounts(source: Record<string, number | Decimal>): CarTypeCountDTO[] {
    return Object.entries(source).map(([carType, count]) => ({
      carType,
      count: Number(count),
    }));
  }
}
