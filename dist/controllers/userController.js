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
exports.deleteUser = exports.withDraw = exports.editInfo = exports.getInfo = exports.createUser = void 0;
const superstruct_1 = require("superstruct");
const userService_1 = __importDefault(require("../services/userService"));
const userStructs_1 = require("../structs/userStructs");
const userDTO_1 = require("../lib/dtos/userDTO");
const companyService_1 = __importDefault(require("../services/companyService"));
const CommonError_1 = __importDefault(require("../lib/errors/CommonError"));
const client_1 = require("@prisma/client");
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
/**
 * @openapi
 * /users:
 *   post:
 *     summary: 새로운 사용자 생성
 *     description: 새로운 사용자를 생성하며, 회사 이름과 코드가 일치하는지 확인합니다.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       description: 생성할 사용자의 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               employeeNumber:
 *                 type: string
 *                 example: 12345
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *               password:
 *                 type: string
 *                 example: securepassword
 *               company:
 *                 type: string
 *                 example: "Acme Corp"
 *               companyCode:
 *                 type: string
 *                 example: "ACME123"
 *     responses:
 *       201:
 *         description: 사용자 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserDTO'
 *       404:
 *         description: 회사가 존재하지 않거나 회사 코드가 잘못됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Company not found or company code is wrong"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, superstruct_1.create)(req.body, userStructs_1.CreateUserBodyStruct);
    const company = yield companyService_1.default.getByName(data.companyName);
    if (company.companyCode !== data.companyCode) {
        throw new CommonError_1.default('Company code is wrong', 404);
    }
    const user = yield userService_1.default.createUser(data, company.id);
    res.status(201).send(new userDTO_1.ResponseUserDTO(user));
});
exports.createUser = createUser;
/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: 로그인한 사용자 정보 조회
 *     description: 현재 로그인한 사용자의 정보를 반환합니다.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserDTO'
 */
const getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    res.send(new userDTO_1.ResponseUserDTO(reqUser));
});
exports.getInfo = getInfo;
/**
 * @openapi
 * /users/me:
 *   patch:
 *     summary: 로그인한 사용자 정보 수정
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 example: john.updated@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: 010-9876-5432
 *     responses:
 *       200:
 *         description: 사용자 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserDTO'
 *       400:
 *         description: 수정하려는 정보가 잘못된 경우
 */
const editInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const data = (0, superstruct_1.create)(req.body, userStructs_1.UpdateUserBodyStruct);
    const user = yield userService_1.default.updateUser(reqUser.id, data);
    res.status(201).send(new userDTO_1.ResponseUserDTO(user));
});
exports.editInfo = editInfo;
/**
 * @openapi
 * /users/me:
 *   delete:
 *     summary: 사용자 탈퇴
 *     description: 현재 로그인한 사용자를 탈퇴 처리합니다.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: 사용자 탈퇴 성공
 */
const withDraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    yield userService_1.default.deleteUser(reqUser.id);
    res.status(204).send();
});
exports.withDraw = withDraw;
/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: 관리자에 의한 사용자 삭제
 *     description: 관리자 권한을 가진 사용자가 특정 사용자를 삭제합니다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 삭제할 사용자 ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: 사용자 삭제 성공
 *       401:
 *         description: 권한이 없습니다. 관리자만 접근 가능합니다.
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    if (reqUser.role !== client_1.USER_ROLE.ADMIN) {
        throw new UnauthError_1.default();
    }
    const { userId } = (0, superstruct_1.create)(req.params, userStructs_1.DeleteUserParamStruct);
    yield userService_1.default.deleteUser(userId);
    res.status(204).send();
});
exports.deleteUser = deleteUser;
