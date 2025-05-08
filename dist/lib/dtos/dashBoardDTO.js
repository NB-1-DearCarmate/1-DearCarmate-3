"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDashBoardDTO = void 0;
class ResponseDashBoardDTO {
    constructor(data) {
        const { thisMonthRevenue, lastMonthRevenue } = data;
        const thisRevenue = Number(thisMonthRevenue);
        const lastRevenue = Number(lastMonthRevenue);
        const growthRate = lastRevenue === 0 ? 0 : Math.round(((thisRevenue - lastRevenue) / lastRevenue) * 100);
        this.monthlySales = thisRevenue;
        this.lastMonthSales = lastRevenue;
        this.growthRate = growthRate;
        this.proceedingContractsCount = data.inProgressContractCount;
        this.completedContractsCount = data.totalSuccessCount;
        this.contractsByCarType = this.mapCarTypeCounts(data.contractCountByCarType);
        this.salesByCarType = this.mapCarTypeCounts(data.contractPriceByCarType);
    }
    mapCarTypeCounts(source) {
        return Object.entries(source).map(([carType, count]) => ({
            carType,
            count: Number(count),
        }));
    }
}
exports.ResponseDashBoardDTO = ResponseDashBoardDTO;
