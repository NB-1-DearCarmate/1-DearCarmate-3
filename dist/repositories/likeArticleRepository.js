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
function getById(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeArticle.findUnique({
            where: {
                userId_articleId: { userId, articleId },
            },
        });
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeArticle.findMany(where);
    });
}
function create(like) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeArticle.create({
            data: like,
        });
    });
}
function remove(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.likeArticle.delete({
            where: {
                userId_articleId: { userId, articleId },
            },
        });
    });
}
function getEntityName() {
    return prismaClient_1.default.likeArticle.getEntityName();
}
exports.default = {
    getById,
    getList,
    create,
    remove: remove,
    getEntityName,
};
