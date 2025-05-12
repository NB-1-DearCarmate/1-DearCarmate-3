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
const Example3Error_1 = __importDefault(require("../lib/errors/Example3Error"));
const Example4Error_1 = __importDefault(require("../lib/errors/Example4Error"));
const articleService_1 = __importDefault(require("../services/articleService"));
const commonStructs_1 = require("../structs/commonStructs");
const superstruct_1 = require("superstruct");
function verifyAricleOwner(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        try {
            const { id: articleId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
            const article = yield articleService_1.default.getById(articleId);
            if (!article) {
                throw new Example3Error_1.default(articleService_1.default.getEntityName(), articleId);
            }
            if (article.userId !== userId) {
                throw new Example4Error_1.default(articleService_1.default.getEntityName(), articleId, userId);
            }
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = {
    verifyAricleOwner,
};
