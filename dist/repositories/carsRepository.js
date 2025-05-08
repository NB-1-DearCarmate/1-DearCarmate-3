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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCar = createCar;
exports.getCarList = getCarList;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
exports.getCar = getCar;
exports.createCars = createCars;
const client_1 = require("@prisma/client");
const prismaClient_1 = require("../lib/prismaClient");
const searchCondition_1 = require("../lib/searchCondition");
function createCar(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.prismaClient.car.create({
            data: Object.assign(Object.assign({}, data), { status: client_1.CAR_STATUS.AVAILABLE }),
        });
    });
}
function getCarList(_a) {
    return __awaiter(this, arguments, void 0, function* ({ page, pageSize, status, searchBy, keyword, }) {
        const searchCondition = (0, searchCondition_1.buildSearchCondition)({ page, pageSize, searchBy, keyword }, [
            'carNumber',
            'model',
        ]);
        const dbStatus = status === 'possession'
            ? client_1.CAR_STATUS.AVAILABLE
            : status === 'contractProceeding'
                ? client_1.CAR_STATUS.PENDING
                : status === 'contractCompleted'
                    ? client_1.CAR_STATUS.SOLD
                    : status;
        const where = Object.assign(Object.assign({}, searchCondition.whereCondition), (dbStatus ? { status: dbStatus } : {}));
        const totalItemCount = yield prismaClient_1.prismaClient.car.count({
            where,
        });
        const cars = yield prismaClient_1.prismaClient.car.findMany(Object.assign(Object.assign({}, searchCondition.pageCondition), { where, include: {
                carModel: {
                    include: {
                        carType: true,
                        manufacturer: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            } }));
        const mappedCars = cars.map((car) => {
            var _a, _b;
            return ({
                id: car.id,
                carNumber: car.carNumber,
                manufacturer: car.carModel.manufacturer.name,
                model: car.carModel.model,
                type: car.carModel.carType.type,
                manufacturingYear: car.manufacturingYear,
                mileage: car.mileage,
                price: car.price,
                accidentCount: car.accidentCount,
                explanation: (_a = car.explanation) !== null && _a !== void 0 ? _a : undefined,
                accidentDetails: (_b = car.accidentDetails) !== null && _b !== void 0 ? _b : undefined,
                status: car.status,
            });
        });
        return {
            totalItemCount,
            mappedCars,
        };
    });
}
function updateCar(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.prismaClient.car.update({
            where: { id },
            data,
        });
    });
}
function deleteCar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.prismaClient.car.delete({
            where: { id },
        });
    });
}
function getCar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.prismaClient.car.findUnique({
            where: { id },
        });
    });
}
function createCars(dataList) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdCars = yield prismaClient_1.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
            const cars = yield Promise.all(dataList.map((data) => prisma.car.create({
                data: Object.assign(Object.assign({}, data), { status: client_1.CAR_STATUS.AVAILABLE }),
            })));
            return cars;
        }));
        return createdCars;
    });
}
