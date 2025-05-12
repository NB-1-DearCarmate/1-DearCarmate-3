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
function findByArticle(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        return (_a = (yield prismaClient_1.default.like.findMany({
            where: {
                userId: userId,
                articleId: articleId,
            },
        }))) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function findByProduct(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        return (_a = (yield prismaClient_1.default.like.findMany({
            where: {
                userId: userId,
                productId: productId,
            },
        }))) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.like.findMany(where);
    });
}
function create(like) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.like.create({
            data: like,
        });
    });
}
function removeByArticle(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.like.deleteMany({
            where: {
                userId: userId,
                articleId: articleId,
            },
        });
    });
}
function removeByProduct(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.like.deleteMany({
            where: {
                userId: userId,
                productId: productId,
            },
        });
    });
}
function getEntityName() {
    return prismaClient_1.default.like.getEntityName();
}
exports.default = {
    findByArticle,
    findByProduct,
    getList,
    create,
    removeByArticle,
    removeByProduct,
    getEntityName,
};
