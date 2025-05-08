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
function create(company) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.company.create({
            data: company,
        });
    });
}
function update(companyId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.company.update({
            data,
            where: {
                id: companyId,
            },
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
    });
}
function findByName(companyName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.company.findUnique({
            where: {
                companyName,
            },
        });
    });
}
function getList(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.company.findMany(Object.assign(Object.assign({}, params), { include: {
                _count: {
                    select: { users: true },
                },
            } }));
    });
}
function getCount(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.company.count(Object.assign({}, params));
    });
}
function deleteById(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.company.delete({
            where: {
                id: companyId,
            },
        });
    });
}
exports.default = {
    create,
    update,
    findByName,
    getList,
    getCount,
    deleteById,
};
