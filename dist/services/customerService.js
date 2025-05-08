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
const customerDTO_1 = require("../lib/dtos/customerDTO");
const customerRepositry_1 = __importDefault(require("../repositories/customerRepositry"));
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const searchCondition_1 = require("../lib/searchCondition");
function createCustomer(companyId, rawData) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = new customerDTO_1.CreateCustomerDTO(rawData);
        const data = Object.assign(Object.assign({}, customer), { company: {
                connect: {
                    id: companyId,
                },
            } });
        return yield customerRepositry_1.default.create(data);
    });
}
function createCustomers(companyId, customers) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = customers.map((customer) => {
            return Object.assign(Object.assign({}, customer), { companyId: companyId });
        });
        return yield customerRepositry_1.default.createMany(data);
    });
}
function getCustomer(customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield customerRepositry_1.default.getById(customerId);
    });
}
function getCustomers(companyId, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchCondition = (0, searchCondition_1.buildSearchCondition)(params, ['name', 'email']);
        const where = Object.assign(Object.assign({}, searchCondition.whereCondition), { companyId: companyId });
        const prismaParams = Object.assign(Object.assign({}, searchCondition.pageCondition), { where });
        const customers = yield customerRepositry_1.default.getList(prismaParams);
        const totalItemCount = yield customerRepositry_1.default.getCount({
            where,
        });
        return {
            totalItemCount,
            customers,
        };
    });
}
function updateCustomer(customerId, rawData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield customerRepositry_1.default.update(customerId, new customerDTO_1.UpdateCustomerDTO(rawData));
    });
}
function getCompanyIdById(customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield customerRepositry_1.default.getById(customerId);
        if (!customer) {
            throw new NotFoundError_1.default('Customer', customerId);
        }
        return customer.companyId;
    });
}
function deleteCustomer(customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield customerRepositry_1.default.deleteById(customerId);
    });
}
exports.default = {
    createCustomer,
    createCustomers,
    getCustomer,
    getCustomers,
    updateCustomer,
    getCompanyIdById,
    deleteCustomer,
};
