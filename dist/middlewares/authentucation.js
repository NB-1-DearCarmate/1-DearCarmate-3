"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = __importDefault(require("../services/userService"));
const constants_1 = require("../config/constants");
const client_1 = require("@prisma/client");
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
const constants_2 = require("../config/constants");
async function expressAuthentication(request, securityName) {
    var _a;
    if (securityName === constants_2.ACCESS_TOKEN_STRATEGY) {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthError_1.default();
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
            const user = await userService_1.default.getUserById(payload.userId);
            const validRoles = [client_1.USER_ROLE.ADMIN, client_1.USER_ROLE.OWNER, client_1.USER_ROLE.EMPLOYEE];
            if (!user || !validRoles.includes(payload.role) || user.role !== payload.role) {
                throw new UnauthError_1.default();
            }
            return user; // 인증된 사용자를 반환
        }
        catch (err) {
            throw new UnauthError_1.default();
        }
    }
    if (securityName === constants_2.REFRESH_TOKEN_STRATEGY) {
        const refreshToken = (_a = request.body) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!refreshToken) {
            throw new Error('No refresh token provided');
        }
        try {
            const payload = jsonwebtoken_1.default.verify(refreshToken, constants_1.JWT_SECRET);
            const user = await userService_1.default.getUserById(payload.userId);
            if (!user || user.role !== payload.role) {
                throw new UnauthError_1.default();
            }
            // refresh token이 유효하면 새로운 access token을 발급
            const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, constants_1.JWT_SECRET, {
                expiresIn: '1h', // 1시간 동안 유효한 새로운 access token 발급
            });
            return { user, newAccessToken }; // 사용자와 새로운 access token 반환
        }
        catch (err) {
            throw new UnauthError_1.default();
        }
    }
    throw new UnauthError_1.default();
}
