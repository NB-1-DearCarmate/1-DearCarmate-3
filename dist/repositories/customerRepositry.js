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
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.create({
            data,
        });
    });
}
function createMany(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.createMany({
            data,
        });
    });
}
function getList(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.findMany(Object.assign(Object.assign({}, params), { include: {
                _count: {
                    select: { contracts: true },
                },
            } }));
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.findUniqueOrThrow({
            where: { id },
            include: {
                _count: {
                    select: { contracts: true },
                },
            },
        });
    });
}
function getCount(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.count(Object.assign({}, params));
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.update({
            where: { id },
            data,
        });
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.customer.delete({
            where: { id },
        });
    });
}
exports.default = {
    create,
    createMany,
    getList,
    getById,
    getCount,
    update,
    deleteById,
};
