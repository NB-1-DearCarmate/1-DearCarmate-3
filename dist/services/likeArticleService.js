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
const likeArticleRepository_1 = __importDefault(require("../repositories/likeArticleRepository"));
function getById(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeArticleRepository_1.default.getById(userId, articleId);
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeArticleRepository_1.default.getList(where);
    });
}
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeArticleRepository_1.default.create(data);
    });
}
function remove(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeArticleRepository_1.default.remove(userId, articleId);
    });
}
function getEntityName() {
    return likeArticleRepository_1.default.getEntityName();
}
exports.default = {
    getById,
    getList,
    create,
    remove,
    getEntityName,
};
