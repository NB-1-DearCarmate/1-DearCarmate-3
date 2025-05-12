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
exports.downloadDocument = exports.uploadDocument = exports.getContractChoice = exports.getDocumentList = void 0;
const superstruct_1 = require("superstruct");
const contractService_1 = __importDefault(require("../services/contractService"));
const commonStructs_1 = require("../structs/commonStructs");
const contractDcmtDTO_1 = require("../lib/dtos/contractDcmtDTO");
const constants_1 = require("../config/constants");
const contractDcmtService_1 = __importDefault(require("../services/contractDcmtService"));
const contractDcmtDTO_2 = require("../lib/dtos/contractDcmtDTO");
const contractDcmtStructs_1 = require("../structs/contractDcmtStructs");
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
const path_1 = __importDefault(require("path"));
const EmptyUploadError_1 = __importDefault(require("../lib/errors/EmptyUploadError"));
const { getContractListWithDcmt, getContractDraft } = contractService_1.default;
const getDocumentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const data = (0, superstruct_1.create)(req.query, commonStructs_1.PageParamsStruct);
    const { contracts, page, pageSize, totalItemCount } = yield getContractListWithDcmt(reqUser.companyId, data);
    res.send(new contractDcmtDTO_1.ResponseContractDcmtsDTO(contracts, page, pageSize, totalItemCount));
});
exports.getDocumentList = getDocumentList;
const getContractChoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const contracts = yield getContractDraft(reqUser.companyId);
    res.send(new contractDcmtDTO_1.ResponseContractChoiceDTO(contracts).data);
});
exports.getContractChoice = getContractChoice;
const uploadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //인가는 클라이언트에서 patch하는 과정을 실행하며 진행
    const file = req.file;
    if (!file) {
        throw new EmptyUploadError_1.default();
    }
    const fileSize = file.size / 1024 / 1024; // MB
    //TODO: test
    console.log(file.path);
    const filePath = path_1.default.join(path_1.default.resolve(), constants_1.DOCUMENT_PATH, file.filename);
    console.log(filePath);
    const { contractId } = req.body;
    const document = yield contractDcmtService_1.default.createDocument(new contractDcmtDTO_2.CreateDocumentDTO(file.filename, filePath, fileSize, contractId));
    res.status(201).send(new contractDcmtDTO_2.ResponseDocumentIdDTO(document.id));
});
exports.uploadDocument = uploadDocument;
const downloadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const { contractDocumentId } = (0, superstruct_1.create)(req.params, contractDcmtStructs_1.DownloadDocumentStruct);
    const contractDocument = yield contractDcmtService_1.default.getDocumentWithCompany(contractDocumentId);
    if (!contractDocument.contract) {
        throw new NotFoundError_1.default('Contract', 'contract');
    }
    if (contractDocument.contract.companyId !== reqUser.companyId) {
        throw new UnauthError_1.default();
    }
    res.download(contractDocument.filePath, contractDocument.fileName, (err) => {
        if (err) {
            console.error('Download error:', err);
            throw err;
        }
    });
});
exports.downloadDocument = downloadDocument;
