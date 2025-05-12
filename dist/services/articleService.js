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
const articleRepository_1 = __importDefault(require("../repositories/articleRepository"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield articleRepository_1.default.getById(id);
    });
}
function getList(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield articleRepository_1.default.getList(where);
    });
}
function create(article) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield articleRepository_1.default.create(article);
    });
}
function update(id, article) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield articleRepository_1.default.update(id, article);
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield articleRepository_1.default.remove(id);
    });
}
function count(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield articleRepository_1.default.count(where);
    });
}
function getEntityName() {
    return articleRepository_1.default.getEntityName();
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
