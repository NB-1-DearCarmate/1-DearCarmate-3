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
function create(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.comment.create({
            data: comment,
        });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.comment.findUnique({
            where: {
                id: id,
            },
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.comment.findMany();
    });
}
function getList(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.comment.findMany(data);
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.comment.update({
            where: {
                id: id,
            },
            data: data,
        });
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.comment.delete({
            where: {
                id: id,
            },
        });
    });
}
function getEntityName() {
    return prismaClient_1.default.comment.getEntityName();
}
exports.default = {
    create,
    getById,
    getAll,
    getList,
    update,
    deleteById,
    getEntityName,
};
