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
function create(contractDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contractDocument.create({
            data: contractDocument,
        });
    });
}
// async function findWithCompanyByDocumentId(
//   params: Omit<Prisma.ContractDocumentFindUniqueArgs, 'include'> & {
//     include: {
//       contract: {
//         include: {
//           company: true;
//         };
//       };
//     };
//   },
// ) {
//   return await prisma.contractDocument.findUnique(params);
// }
// contractDcmtRepository.ts
function findWithCompanyByDocumentId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contractDocument.findUnique({
            where: { id },
            include: {
                contract: {
                    include: {
                        user: {
                            include: {
                                company: true,
                            },
                        },
                    },
                },
            },
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.contractDocument.findUnique({
            where: {
                id,
            },
        });
    });
}
exports.default = {
    create,
    findWithCompanyByDocumentId,
    findById,
};
