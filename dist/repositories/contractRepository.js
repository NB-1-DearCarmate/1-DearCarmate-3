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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
function create(data, userId, companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const contractPrice = (_a = data.contractPrice) !== null && _a !== void 0 ? _a : 0;
        const convertedData = Object.assign(Object.assign({}, data), { contractPrice,
            userId,
            companyId, meetings: data.meetings.map(({ date }) => ({ time: new Date(date) })) });
        return yield prismaClient_1.default.contract.create({
            data: Object.assign(Object.assign({}, convertedData), { status: client_1.CONTRACT_STATUS.VEHICLE_CHECKING, meetings: {
                    create: convertedData.meetings,
                } }),
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
    });
}
function update(id, contractData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { meetings: dateMeetings, status: stringStatus, contractDocuments } = contractData, rest = __rest(contractData, ["meetings", "status", "contractDocuments"]);
        const meetings = dateMeetings === null || dateMeetings === void 0 ? void 0 : dateMeetings.map(({ date }) => ({ time: new Date(date) }));
        let status = undefined;
        switch (stringStatus) {
            case 'CONTRACT_PREPARING':
                status = client_1.CONTRACT_STATUS.CONTRACT_PREPARING;
                break;
            case 'CONTRACT_SUCCESS':
                status = client_1.CONTRACT_STATUS.CONTRACT_SUCCESS;
                break;
            case 'CONTRACT_FAILED':
                status = client_1.CONTRACT_STATUS.CONTRACT_FAILED;
                break;
            case 'PRICE_CHECKING':
                status = client_1.CONTRACT_STATUS.PRICE_CHECKING;
                break;
            case 'VEHICLE_CHECKING':
                status = client_1.CONTRACT_STATUS.VEHICLE_CHECKING;
                break;
        }
        return yield prismaClient_1.default.contract.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, rest), { status }), (meetings && {
                meetings: {
                    deleteMany: {},
                    create: meetings,
                },
            })), (contractDocuments && {
                contractDocuments: {
                    set: contractDocuments.map((doc) => ({ id: doc.id })),
                },
            })),
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
    });
}
function findMany(_a, companyId_1) {
    return __awaiter(this, arguments, void 0, function* ({ searchBy, keyword }, companyId) {
        let where = {
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
        const contracts = yield prismaClient_1.default.contract.findMany({
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
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contract.findUnique({
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
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contract.delete({
            where: { id },
        });
    });
}
function updateStatus(id, status, resolutionDate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contract.update({
            where: { id },
            data: {
                status,
                resolutionDate: resolutionDate !== null && resolutionDate !== void 0 ? resolutionDate : null,
            },
        });
    });
}
function findCustomerDropdown(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.findMany({
            where: { companyId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    });
}
function findUserDropdown(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.findMany({
            where: { companyId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    });
}
function findCarDropdown(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.car.findMany({
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
    });
}
// develop의 계약 문서 포함 필터링 리스트
function findManyWithDoc(companyId_1, _a) {
    return __awaiter(this, arguments, void 0, function* (companyId, { page, pageSize, searchBy, keyword }) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        let where = {
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
        const contracts = yield prismaClient_1.default.contract.findMany({
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
        const totalItemCount = yield getCount({ where });
        return { contracts, totalItemCount };
    });
}
// develop의 계약 드래프트 리스트
function findManyDraft(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contract.findMany({
            where: {
                companyId,
                status: 'CONTRACT_SUCCESS',
            },
            include: {
                car: { include: { carModel: true } },
                customer: true,
            },
        });
    });
}
// develop의 count, 통계 관련 쿼리
function getCount(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contract.count(params);
    });
}
function findCompanyIdbycontractId(contractId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contract.findUnique({
            where: { id: contractId },
            select: { companyId: true },
        });
    });
}
function getContractPriceSum(companyId, startDate, endDate, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tx.contract.aggregate({
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
    });
}
function getInProgressContractCount(companyId, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tx.contract.count({
            where: {
                companyId,
                status: {
                    notIn: ['CONTRACT_SUCCESS', 'CONTRACT_FAILED'],
                },
            },
        });
    });
}
function getContractSummary(companyId, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tx.contract.findMany({
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
    });
}
exports.default = {
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
