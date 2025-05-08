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
exports.refreshToken = exports.logout = exports.login = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const constants_1 = require("../config/constants");
const authDTO_1 = require("../lib/dtos/authDTO");
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자가 이메일과 비밀번호를 통해 로그인하고, 성공적으로 로그인 시 액세스토큰과 리프레시토큰을 반환합니다.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 로그인할 사용자의 이메일 주소
 *                 example: user1@sunshine.com
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호
 *                 example: password
 *     responses:
 *       200:
 *         description: 로그인 성공. 액세스토큰과 리프레시토큰을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDTO'
 *       400:
 *         description: 잘못된 요청. 이메일이나 비밀번호가 잘못되었습니다.
 *       401:
 *         description: 인증 실패. 제공된 이메일 또는 비밀번호가 일치하지 않습니다.
 *       500:
 *         description: 서버 오류. 로그인 과정에서 오류가 발생했습니다.
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const accessToken = userService_1.default.createToken(reqUser);
    const refreshToken = userService_1.default.createToken(reqUser, 'refresh');
    res.cookie(constants_1.REFRESH_tOKEN_STRING, refreshToken, {
        path: '/auth/refresh',
        httpOnly: true,
        sameSite: 'none',
        secure: false,
    });
    res.send(new authDTO_1.LoginResponseDTO(reqUser, accessToken, refreshToken));
});
exports.login = login;
/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: 로그아웃
 *     description: 사용자가 로그아웃할 때, 쿠키에 저장된 액세스토큰과 리프레시토큰을 삭제합니다.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 성공적으로 로그아웃됨
 *       500:
 *         description: 서버 오류. 로그아웃 처리 중 오류가 발생했습니다.
 */
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie(constants_1.ACCESS_tOKEN_STRING, { path: '/' });
    res.clearCookie(constants_1.REFRESH_tOKEN_STRING, { path: '/' });
    res.send('로그아웃');
});
exports.logout = logout;
/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: 액세스토큰 갱신
 *     description: 유효한 리프레시토큰을 사용하여 새로운 액세스토큰과 리프레시토큰을 반환합니다.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 새로운 액세스 및 리프레시 토큰 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: 새로운 액세스토큰
 *                 refreshToken:
 *                   type: string
 *                   description: 새로운 리프레시토큰
 *       401:
 *         description: 리프레시토큰이 유효하지 않거나 만료된 경우
 *       500:
 *         description: 서버 오류. 토큰 갱신 처리 중 오류 발생
 */
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const { accessToken, newRefreshToken } = yield userService_1.default.refreshToken(reqUser.id);
    res.cookie(constants_1.REFRESH_tOKEN_STRING, newRefreshToken, {
        path: '/auth/refresh',
        httpOnly: true,
        sameSite: 'none',
        secure: false,
    });
    res.send({ accessToken, refreshToken: newRefreshToken });
});
exports.refreshToken = refreshToken;
