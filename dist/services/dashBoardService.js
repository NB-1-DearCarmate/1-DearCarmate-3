"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const contractRepository_1 = __importDefault(require("../repositories/contractRepository"));
function getRevenueByFlag(companyId, isThisMonth, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        let startDate;
        let endDate;
        if (isThisMonth) {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // 이번 달 1일
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // 다음 달 1일
        }
        else {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // 지난 달 1일
            endDate = new Date(now.getFullYear(), now.getMonth(), 1); // 이번 달 1일
        }
        const result = yield contractRepository_1.default.getContractPriceSum(companyId, startDate, endDate, tx);
        return result._sum.contractPrice || 0;
    });
}
function getContractSummary(companyId, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const contracts = yield contractRepository_1.default.getContractSummary(companyId, tx);
        const totalSuccessCount = contracts.length;
        const contractCountByCarType = {};
        const contractPriceByCarType = {};
        for (const contract of contracts) {
            const type = contract.car.carModel.carType.type;
            const price = Number(contract.contractPrice);
            contractCountByCarType[type] = ((_a = contractCountByCarType[type]) !== null && _a !== void 0 ? _a : 0) + 1;
            contractPriceByCarType[type] = ((_b = contractPriceByCarType[type]) !== null && _b !== void 0 ? _b : 0) + price;
        }
        return {
            totalSuccessCount,
            contractCountByCarType,
            contractPriceByCarType,
        };
    });
}
function getDashBoardData(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const thisMonthRevenue = yield getRevenueByFlag(companyId, true, tx); // 이번 달
            const lastMonthRevenue = yield getRevenueByFlag(companyId, false, tx); // 지난 달
            const inProgressContractCount = yield contractRepository_1.default.getInProgressContractCount(companyId, tx);
            const { totalSuccessCount, contractCountByCarType, contractPriceByCarType } = yield getContractSummary(companyId, tx);
            return {
                thisMonthRevenue,
                lastMonthRevenue,
                inProgressContractCount,
                totalSuccessCount,
                contractCountByCarType,
                contractPriceByCarType,
            };
        }));
    });
}
exports.default = {
    getDashBoardData,
};
