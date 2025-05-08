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
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("../../config/constants");
const userService_1 = __importDefault(require("../../services/userService"));
const client_1 = require("@prisma/client");
const accessTokenOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants_1.JWT_SECRET,
};
const refreshTokenOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('refreshToken'),
    secretOrKey: constants_1.JWT_SECRET,
};
function jwtVerify(payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, role } = payload;
            const user = yield userService_1.default.getUserById(userId);
            const validRoles = [client_1.USER_ROLE.ADMIN, client_1.USER_ROLE.OWNER, client_1.USER_ROLE.EMPLOYEE];
            if (!user || !validRoles.includes(role) || role !== user.role) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    });
}
const accessTokenStrategy = new passport_jwt_1.Strategy(accessTokenOptions, jwtVerify);
const refreshTokenStrategy = new passport_jwt_1.Strategy(refreshTokenOptions, jwtVerify);
exports.default = {
    accessTokenStrategy,
    refreshTokenStrategy,
};
