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
function getById(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeProduct.findUnique({
            where: {
                userId_productId: { userId, productId },
            },
        });
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeProduct.findMany(where);
    });
}
function create(like) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeProduct.create({
            data: like,
        });
    });
}
function remove(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeProduct.delete({
            where: {
                userId_productId: { userId, productId },
            },
        });
    });
}
function getEntityName() {
    return prismaClient_1.default.likeProduct.getEntityName();
}
exports.default = {
    getById,
    getList,
    create,
    remove,
    getEntityName,
};
