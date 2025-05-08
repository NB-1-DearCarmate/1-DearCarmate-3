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
exports.deleteCompany = exports.patchCompany = exports.getCompanyUsers = exports.getCompanyList = exports.postCompany = void 0;
const companyService_1 = __importDefault(require("../services/companyService"));
const client_1 = require("@prisma/client");
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
const userService_1 = __importDefault(require("../services/userService"));
const commonStructs_1 = require("../structs/commonStructs");
const superstruct_1 = require("superstruct");
const companyStructs_1 = require("../structs/companyStructs");
const companyDTO_1 = require("../lib/dtos/companyDTO");
/**
 * @openapi
 * /companies:
 *   post:
 *     summary: 새로운 회사 생성
 *     description: 새로운 회사를 생성합니다. 관리자 권한을 가진 사용자만 생성할 수 있습니다.
 *     tags:
 *       - Company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: 회사의 이름입니다.
 *                 example: "햇살카"
 *               companyCode:
 *                 type: string
 *                 description: 회사 고유 코드입니다.
 *                 example: "HS001"
 *     responses:
 *       201:
 *         description: 회사가 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: 생성된 회사의 고유 ID입니다.
 *                   example: 1
 *                 companyName:
 *                   type: string
 *                   description: 생성된 회사의 이름입니다.
 *                   example: "햇살카"
 *                 companyCode:
 *                   type: string
 *                   description: 생성된 회사의 고유 코드입니다.
 *                   example: "HS001"
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 잘못된 형식일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const postCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.ADMIN) {
        throw new UnauthError_1.default();
    }
    const data = (0, superstruct_1.create)(req.body, companyStructs_1.CreateCompanyBodyStruct);
    const company = yield companyService_1.default.createCompany(data);
    res.status(201).send(company);
});
exports.postCompany = postCompany;
/**
 * @openapi
 * /companies:
 *   get:
 *     summary: 회사 목록 조회
 *     description: 회사 목록을 페이지 단위로 조회합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 회사 목록이 성공적으로 반환되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCompanyListDTO'
 *       400:
 *         description: 잘못된 요청입니다. 유효하지 않은 페이지 번호 또는 페이지 크기일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getCompanyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.ADMIN) {
        throw new UnauthError_1.default();
    }
    const data = (0, superstruct_1.create)(req.query, commonStructs_1.PageParamsStruct);
    const result = yield companyService_1.default.getCompanies(data);
    res.send(new companyDTO_1.ResponseCompanyListDTO(data.page, data.pageSize, result));
});
exports.getCompanyList = getCompanyList;
/**
 * @openapi
 * /companies/users:
 *   get:
 *     summary: 회사의 사용자 목록 조회
 *     description: 모든 회사의 사용자 목록을 페이지 단위로 조회합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 회사의 사용자 목록이 성공적으로 반환되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCompanyUserListDTO'
 *       400:
 *         description: 잘못된 요청입니다. 유효하지 않은 페이지 번호 또는 페이지 크기일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getCompanyUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.ADMIN) {
        throw new UnauthError_1.default();
    }
    const pageParams = (0, superstruct_1.create)(req.query, commonStructs_1.PageParamsStruct);
    const result = yield userService_1.default.getCompanyUsers(pageParams);
    res.send(new companyDTO_1.ResponseCompanyUserListDTO(pageParams.page, pageParams.pageSize, result.users, result.totalItemCount));
});
exports.getCompanyUsers = getCompanyUsers;
/**
 * @openapi
 * /companies/{companyId}:
 *   patch:
 *     summary: 회사 정보 수정
 *     description: 지정된 회사의 정보를 수정합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 회사 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: 수정할 회사 이름
 *                 example: 햇살카 수정
 *               companyCode:
 *                 type: string
 *                 description: 수정할 회사 코드
 *                 example: HS-001
 *     responses:
 *       200:
 *         description: 회사 정보가 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCompanyDTO'
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 잘못된 형식일 수 있습니다.
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const patchCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.ADMIN) {
        throw new UnauthError_1.default();
    }
    const { companyId } = (0, superstruct_1.create)(req.params, companyStructs_1.CompanyIdParamStruct);
    const data = (0, superstruct_1.create)(req.body, companyStructs_1.PatchCompanyBodyStruct);
    const company = yield companyService_1.default.updateCompany(companyId, data);
    res.send(company);
});
exports.patchCompany = patchCompany;
/**
 * @openapi
 * /companies/{companyId}:
 *   delete:
 *     summary: 회사 삭제
 *     description: 지정된 회사의 정보를 삭제합니다. 관리자의 권한을 가진 사용자만 접근할 수 있습니다.
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 회사 ID
 *     responses:
 *       200:
 *         description: 회사가 성공적으로 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사 삭제 성공"
 *       401:
 *         description: 관리자 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const deleteCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.ADMIN) {
        throw new UnauthError_1.default();
    }
    const companyId = parseInt(req.params.companyId, 10);
    yield companyService_1.default.deleteCompany(companyId);
    res.status(200).send({ message: '회사 삭제 성공' });
});
exports.deleteCompany = deleteCompany;
