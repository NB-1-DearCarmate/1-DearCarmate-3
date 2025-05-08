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
function create(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.create({
            data: user,
        });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.update({
            where: {
                id,
            },
            data: data,
        });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.delete({
            where: {
                id: id,
            },
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.findUnique({
            where: {
                id,
            },
        });
    });
}
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.findUnique({
            where: {
                email,
            },
        });
    });
}
function findMany(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.findMany(Object.assign(Object.assign({}, params), { include: {
                company: {
                    select: { companyName: true },
                },
            } }));
    });
}
function findCompanyIdbyUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                companyId: true,
            },
        });
    });
}
function getCount(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.user.count(Object.assign({}, params));
    });
}
exports.default = {
    create,
    update,
    remove,
    findById,
    findByEmail,
    findMany,
    findCompanyIdbyUserId,
    getCount,
};
