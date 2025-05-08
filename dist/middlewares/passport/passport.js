"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
const jwtStrategy_1 = __importDefault(require("./jwtStrategy"));
const constants_1 = require("../../config/constants");
passport_1.default.use(constants_1.LOCAL_STRATEGY, localStrategy_1.default);
passport_1.default.use(constants_1.ACCESS_TOKEN_STRATEGY, jwtStrategy_1.default.accessTokenStrategy);
passport_1.default.use(constants_1.REFRESH_TOKEN_STRATEGY, jwtStrategy_1.default.refreshTokenStrategy);
exports.default = passport_1.default;
