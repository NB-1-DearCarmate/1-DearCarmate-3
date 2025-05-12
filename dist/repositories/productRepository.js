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
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.findUnique({
            where: {
                id: id,
            },
        });
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.findMany(where);
    });
}
function create(product) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.create({
            data: product,
        });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.update({
            where: {
                id,
            },
            data: data,
        });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.delete({
            where: {
                id: id,
            },
        });
    });
}
function count(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.count(where);
    });
}
function getEntityName() {
    return prismaClient_1.default.product.getEntityName();
}
exports.default = {
    getById,
    create,
    update,
    remove,
    count,
    getList,
    getEntityName,
};
