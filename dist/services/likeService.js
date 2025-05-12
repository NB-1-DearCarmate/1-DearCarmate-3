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
const likeRepository_1 = __importDefault(require("../repositories/likeRepository"));
function getByArticle(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeRepository_1.default.findByArticle(userId, articleId);
    });
}
function getByProduct(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeRepository_1.default.findByProduct(userId, productId);
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeRepository_1.default.getList(where);
    });
}
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeRepository_1.default.create(data);
    });
}
function removeByArticle(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeRepository_1.default.removeByArticle(userId, articleId);
    });
}
function removeByProduct(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield likeRepository_1.default.removeByProduct(userId, productId);
    });
}
function getEntityName() {
    return likeRepository_1.default.getEntityName();
}
exports.default = {
    getByArticle,
    getByProduct,
    getList,
    create,
    removeByArticle,
    removeByProduct,
    getEntityName,
};
