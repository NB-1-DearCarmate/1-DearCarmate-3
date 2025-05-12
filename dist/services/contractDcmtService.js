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
const contractDcmtRepository_1 = __importDefault(require("../repositories/contractDcmtRepository"));
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
function createDocument(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield contractDcmtRepository_1.default.create(data);
    });
}
function getDocumentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = yield contractDcmtRepository_1.default.findById(id);
        if (!document) {
            throw new NotFoundError_1.default('ContractDocument', id);
        }
        return document;
    });
}
function getDocumentWithCompany(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let prismaParams = {
            include: {
                contract: {
                    include: {
                        company: true,
                    },
                },
            },
            where: {
                id: id,
            },
        };
        const document = yield contractDcmtRepository_1.default.findWithCompanyByDocumentId(id);
        if (!document) {
            throw new NotFoundError_1.default('ContractDocument', id);
        }
        return document;
    });
}
exports.default = {
    createDocument,
    getDocumentById,
    getDocumentWithCompany,
};
