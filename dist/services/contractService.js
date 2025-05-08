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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractListWithDoc = getContractListWithDoc;
const superstruct_1 = require("superstruct");
const contractStructs_1 = require("../structs/contractStructs");
const contractRepository_1 = __importDefault(require("../repositories/contractRepository"));
const createContractService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, superstruct_1.assert)(data, contractStructs_1.ContractCreateStruct);
    const contract = yield contractRepository_1.default.create(data);
    return contract;
});
const updateContractService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { meetings } = data, contractData = __rest(data, ["meetings"]);
    const updatedContract = yield contractRepository_1.default.update(id, contractData, meetings);
    return updatedContract;
});
const getAllContractsService = (params, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractRepository_1.default.findMany(params, companyId);
});
const getContractByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield contractRepository_1.default.findById(id);
    return contract;
});
const deleteContractService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractRepository_1.default.deleteById(id);
});
const updateContractStatusService = (id, status, resolutionDate) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedContract = yield contractRepository_1.default.updateStatus(id, status, resolutionDate);
    return updatedContract;
});
const getCustomerDropdownService = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractRepository_1.default.findCustomerDropdown(companyId);
});
const getUserDropdownService = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractRepository_1.default.findUserDropdown(companyId);
});
const getCarDropdownService = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractRepository_1.default.findCarDropdown(companyId);
});
// develop 계약서 드래프트용 조회
const getContractDraft = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractRepository_1.default.findManyDraft(companyId);
});
function getContractListWithDoc(companyId, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield contractRepository_1.default.findManyWithDoc(companyId, params);
    });
}
exports.default = {
    createContractService,
    updateContractService,
    getAllContractsService,
    getContractByIdService,
    deleteContractService,
    updateContractStatusService,
    getCustomerDropdownService,
    getUserDropdownService,
    getCarDropdownService,
    getContractListWithDoc,
    getContractDraft,
};
