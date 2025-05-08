"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATIC_PATH = exports.PUBLIC_PATH = exports.EMAIL_PW = exports.DOCUMENT_PATH = exports.IMAGE_PATH = exports.REFRESH_tOKEN_STRING = exports.ACCESS_tOKEN_STRING = exports.LOCAL_STRATEGY = exports.REFRESH_TOKEN_STRATEGY = exports.ACCESS_TOKEN_STRATEGY = exports.JWT_SECRET = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const CommonError_1 = __importDefault(require("../lib/errors/CommonError"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
    throw new CommonError_1.default('Missing Environment Variable', 500);
}
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ACCESS_TOKEN_STRATEGY = 'access-token';
exports.REFRESH_TOKEN_STRATEGY = 'refresh-token';
exports.LOCAL_STRATEGY = 'local';
exports.ACCESS_tOKEN_STRING = 'accessToken';
exports.REFRESH_tOKEN_STRING = 'refreshToken';
exports.IMAGE_PATH = 'public/images';
exports.DOCUMENT_PATH = 'public/documents';
exports.EMAIL_PW = process.env.EMAIL_PW || '';
exports.PUBLIC_PATH = './public';
exports.STATIC_PATH = '/public';
