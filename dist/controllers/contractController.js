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
const contractService_1 = __importDefault(require("../services/contractService"));
const contractDTO_1 = require("../lib/dtos/contractDTO");
const superstruct_1 = require("superstruct");
const contractStructs_1 = require("../structs/contractStructs");
const CommonError_1 = __importDefault(require("../lib/errors/CommonError"));
const emailHandler_1 = require("../lib/emailHandler");
const client_1 = require("@prisma/client");
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
const commonStructs_1 = require("../structs/commonStructs");
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
/**
 * @openapi
 * /contracts:
 *   post:
 *     summary: 계약 생성
 *     description: 새로운 계약을 생성합니다. 생성된 계약 정보가 반환됩니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: 생성할 계약 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *               carId:
 *                 type: number
 *               userId:
 *                 type: number
 *               contractPrice:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [VEHICLE_CHECKING, PRICE_CHECKING, CONTRACT_PREPARING, CONTRACT_SUCCESS, CONTRACT_FAILED]
 *               resolutionDate:
 *                 type: string
 *                 format: date-time
 *               meetings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date-time
 *           example:
 *             customerId: 20
 *             carId: 30
 *             userId: 11
 *             contractPrice: 15000000
 *             status: "VEHICLE_CHECKING"
 *             meetings:
 *               - date: "2025-05-10T14:00:00.000Z"
 *     responses:
 *       201:
 *         description: 계약과 관련된 회의가 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractDTO'
 *             example:
 *               id: 1
 *               contractPrice: 15000000
 *               status: "VEHICLE_CHECKING"
 *               resolutionDate: null
 *               user:
 *                 id: 1
 *                 name: "김영업"
 *               customer:
 *                 id: 2
 *                 name: "홍길동"
 *               car:
 *                 id: 3
 *                 model: "소나타"
 *               meetings:
 *                 - date: "2025-05-10T14:00:00.000Z"
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 형식이 잘못되었을 수 있습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const createContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const data = (0, superstruct_1.create)(req.body, contractStructs_1.ContractCreateStruct);
    const contract = yield contractService_1.default.createContractService(data, reqUser.id, reqUser.companyId);
    res.status(201).send(new contractDTO_1.ResponseContractDTO(contract));
});
/**
 * @openapi
 * /contracts/{contractId}:
 *   patch:
 *     summary: 계약 수정
 *     description: 기존 계약 정보를 수정합니다. 새로운 계약 문서가 추가된 경우 고객에게 이메일이 전송됩니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         description: 수정할 계약의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: 수정할 계약 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *               carId:
 *                 type: number
 *               contractPrice:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum:
 *                   - VEHICLE_CHECKING
 *                   - PRICE_CHECKING
 *                   - CONTRACT_PREPARING
 *                   - CONTRACT_SUCCESS
 *                   - CONTRACT_FAILED
 *               resolutionDate:
 *                 type: string
 *                 format: date-time
 *               meetings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date-time
 *               contractDocuments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     fileName:
 *                       type: string
 *           example:
 *             customerId: 20
 *             carId: 30
 *             contractPrice: 16000000
 *             status: "CONTRACT_PREPARING"
 *             resolutionDate: "2025-05-12T12:00:00.000Z"
 *             meetings:
 *               - date: "2025-05-10T14:00:00.000Z"
 *             contractDocuments:
 *               - id: 1
 *                 fileName: "계약서_2025_05_10.pdf"
 *     responses:
 *       200:
 *         description: 계약이 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractDTO'
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 형식이 잘못되었을 수 있습니다.
 *       404:
 *         description: 해당 ID의 계약을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const updateContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contractId = parseInt(req.params.contractId);
    const data = (0, superstruct_1.create)(req.body, contractStructs_1.ContractUpdateStruct);
    const existingContract = yield contractService_1.default.getContractByIdService(contractId);
    const existingDcmtId = new Set(existingContract === null || existingContract === void 0 ? void 0 : existingContract.contractDocuments.map((dcmt) => dcmt.id));
    const updated = yield contractService_1.default.updateContractService(contractId, data);
    const { customer, createdAt, companyId, id } = updated, tempResponse = __rest(updated, ["customer", "createdAt", "companyId", "id"]);
    const isNewDocumentAdded = updated.contractDocuments.some((dcmt) => !existingDcmtId.has(dcmt.id));
    const newDocumentPaths = updated.contractDocuments
        .filter((dcmt) => !existingDcmtId.has(dcmt.id))
        .map((dcmt) => dcmt.filePath);
    if (isNewDocumentAdded) {
        (0, emailHandler_1.sendEmail)(customer.email, newDocumentPaths);
    }
    res.send(new contractDTO_1.ResponseContractDTO(updated));
});
/**
 * @openapi
 * /contracts:
 *   get:
 *     summary: 계약 목록 조회
 *     description: 계약 목록을 조회합니다. 직원 또는 대표 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchBy
 *         required: true
 *         description: 검색 기준을 선택합니다
 *         schema:
 *           type: string
 *           enum: [customerName, userName]
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: 검색할 키워드입니다
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 계약 목록이 성공적으로 조회되었습니다
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseContractListDTO'
 *       401:
 *         description: 권한이 없는 사용자입니다
 *       500:
 *         description: 서버 오류가 발생했습니다
 */
const getAllContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.EMPLOYEE && reqUser.role !== client_1.USER_ROLE.OWNER) {
        throw new UnauthError_1.default();
    }
    const params = (0, superstruct_1.create)(req.query, commonStructs_1.SearchParamsStruct);
    const contracts = yield contractService_1.default.getAllContractsService(params, reqUser.companyId);
    res.send(new contractDTO_1.ResponseContractListDTO(contracts));
});
/**
 * @openapi
 * /contracts/{contractId}:
 *   delete:
 *     summary: 계약 삭제
 *     description: 특정 계약을 삭제합니다. 계약을 등록한 회사의 직원만 삭제할 수 있습니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         description: 삭제할 계약의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 계약이 성공적으로 삭제되었습니다
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 계약이 삭제되었습니다.
 *       403:
 *         description: 해당 계약에 대한 삭제 권한이 없습니다
 *       404:
 *         description: 계약을 찾을 수 없습니다
 *       500:
 *         description: 서버 오류가 발생했습니다
 */
const deleteContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const id = parseInt(req.params.contractId);
    const existingContract = yield contractService_1.default.getContractByIdService(id);
    if (!existingContract) {
        throw new NotFoundError_1.default('Contract', id);
    }
    if (reqUser.id !== (existingContract === null || existingContract === void 0 ? void 0 : existingContract.userId)) {
        throw new CommonError_1.default('담당자만 삭제가 가능합니다.', 403);
    }
    yield contractService_1.default.deleteContractService(id);
    res.send({ message: '계약이 삭제되었습니다.' });
});
/**
 * @openapi
 * /contracts/customers:
 *   get:
 *     summary: 고객 드롭다운 목록 조회
 *     description: 사용자의 회사에 속한 고객 목록을 조회하여 드롭다운 형식으로 반환합니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 고객 목록을 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     example: "홍길동"
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getCustomerDropdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const customers = yield contractService_1.default.getCustomerDropdownService(reqUser.companyId);
    res.send(new contractDTO_1.ResponseCustomerDropdownDTO(customers));
});
/**
 * @openapi
 * /contracts/users:
 *   get:
 *     summary: 사용자 드롭다운 목록 조회
 *     description: 사용자의 회사에 속한 사용자 목록을 조회하여 드롭다운 형식으로 반환합니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 목록을 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     example: "홍길동"
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getUserDropdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const users = yield contractService_1.default.getUserDropdownService(reqUser.companyId);
    res.send(new contractDTO_1.ResponseUserDropdownDTO(users));
});
/**
 * @openapi
 * /contracts/cars:
 *   get:
 *     summary: 차량 드롭다운 목록 조회
 *     description: 사용자의 회사에 속한 차량 목록을 조회하여 드롭다운 형식으로 반환합니다.
 *     tags:
 *       - Contract
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 차량 목록을 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     example: "레이(01더 0101)"
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getCarDropdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const cars = yield contractService_1.default.getCarDropdownService(reqUser.companyId);
    res.send(new contractDTO_1.ResponseCarDropdownDTO(cars));
});
exports.default = {
    createContract,
    updateContract,
    getAllContracts,
    deleteContract,
    getCustomerDropdown,
    getUserDropdown,
    getCarDropdown,
};
