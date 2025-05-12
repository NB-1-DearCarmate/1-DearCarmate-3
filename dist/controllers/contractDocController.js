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
const contractDocDTO_1 = require("../lib/dtos/contractDocDTO");
const constants_1 = require("../config/constants");
const contractDocService_1 = __importDefault(require("../services/contractDocService"));
const contractDocDTO_2 = require("../lib/dtos/contractDocDTO");
const contractDocStructs_1 = require("../structs/contractDocStructs");
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
const path_1 = __importDefault(require("path"));
const EmptyUploadError_1 = __importDefault(require("../lib/errors/EmptyUploadError"));
/**
 * @openapi
 * /contractDocuments:
 *   get:
 *     summary: 계약 문서 목록 조회
 *     description: 페이지 정보를 기반으로 계약 문서 목록을 조회합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: searchBy
 *         required: false
 *         schema:
 *           type: string
 *         description: 검색 기준
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: 검색 키워드
 *     responses:
 *       200:
 *         description: 계약 문서 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractDocListDTO'
 *             example:
 *               contracts:
 *                 - id: 1
 *                   contractPrice: 9500000
 *                   status: "ONGOING"
 *                   createdAt: "2024-02-01T10:00:00Z"
 *                   car:
 *                     id: 5
 *                     carNumber: "12가3456"
 *                   customer:
 *                     id: 7
 *                     name: "홍길동"
 *               page: 1
 *               pageSize: 10
 *               totalCount: 42
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
const getDocumentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const data = (0, superstruct_1.create)(req.query, commonStructs_1.PageParamsStruct);
    const { contracts, totalItemCount } = yield contractService_1.default.getContractListWithDoc(reqUser.companyId, data);
    res.send(new contractDocDTO_1.ResponseContractDocListDTO(contracts, data.page, data.pageSize, totalItemCount));
});
exports.getDocumentList = getDocumentList;
/**
 * @openapi
 * /contractDocuments/draft:
 *   get:
 *     summary: 계약 선택 목록 조회
 *     description: 계약 초안 상태인 계약 목록을 조회합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 계약 선택 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResponseContractChoiceDTO'
 *             example:
 *               - id: 3
 *                 contractPrice: 8000000
 *                 customer:
 *                   id: 12
 *                   name: "이순신"
 *                 car:
 *                   id: 9
 *                   carNumber: "34나7890"
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
const getContractChoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const contracts = yield contractService_1.default.getContractDraft(reqUser.companyId);
    res.send(new contractDocDTO_1.ResponseContractChoiceDTO(contracts).data);
});
exports.getContractChoice = getContractChoice;
/**
 * @openapi
 * /contractDocuments/upload:
 *   post:
 *     summary: 계약 문서 업로드
 *     description: 계약 문서를 업로드합니다. 파일 형식은 `multipart/form-data`로 전송해야 합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 문서 파일
 *     responses:
 *       201:
 *         description: 문서 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseDocumentIdDTO'
 *             example:
 *               id: 42
 *       400:
 *         description: 업로드된 파일이 없거나 잘못된 요청입니다.
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
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
    const document = yield contractDocService_1.default.createDocument(file.filename, filePath, fileSize);
    res.status(201).send(new contractDocDTO_2.ResponseDocumentIdDTO(document.id));
});
exports.uploadDocument = uploadDocument;
/**
 * @openapi
 * /contractDocuments/{contractDocumentId}/download:
 *   get:
 *     summary: 계약 문서 다운로드
 *     description: 계약 문서를 다운로드합니다.
 *     tags:
 *       - Contract Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractDocumentId
 *         required: true
 *         schema:
 *           type: number
 *         description: 다운로드할 계약 문서의 ID
 *     responses:
 *       200:
 *         description: 문서 다운로드 성공
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: 계약 또는 문서를 찾을 수 없습니다.
 *       401:
 *         description: 권한이 없는 사용자입니다.
 */
const downloadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const { contractDocumentId } = (0, superstruct_1.create)(req.params, contractDocStructs_1.DownloadDocumentStruct);
    const contractDocument = yield contractDocService_1.default.getDocumentWithCompany(contractDocumentId);
    if (contractDocument.contract && contractDocument.contract.companyId !== reqUser.companyId) {
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
