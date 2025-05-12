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
const companyDTO_1 = require("../lib/dtos/companyDTO");
const companyRepository_1 = __importDefault(require("../repositories/companyRepository"));
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const searchCondition_1 = require("../lib/searchCondition");
function createCompany(company) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdCompany = yield companyRepository_1.default.create(company);
        return new companyDTO_1.ResponseCompanyDTO(createdCompany);
    });
}
function updateCompany(companyId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedCompany = yield companyRepository_1.default.update(companyId, body);
        return new companyDTO_1.ResponseCompanyDTO(updatedCompany);
    });
}
function getByName(companyName) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = yield companyRepository_1.default.findByName(companyName);
        if (!company) {
            throw new NotFoundError_1.default('Company', companyName);
        }
        return company;
    });
}
function getCompanies(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchCondition = (0, searchCondition_1.buildSearchCondition)(params, ['companyName', 'companyCode']);
        const where = searchCondition.whereCondition;
        const prismaParams = Object.assign(Object.assign({}, searchCondition.pageCondition), { where });
        const companies = yield companyRepository_1.default.getList(prismaParams);
        const totalItemCount = yield companyRepository_1.default.getCount({
            where,
        });
        return {
            totalItemCount,
            companies,
        };
    });
}
function deleteCompany(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield companyRepository_1.default.deleteById(companyId);
    });
}
exports.default = {
    createCompany,
    updateCompany,
    getByName,
    getCompanies,
    deleteCompany,
};
