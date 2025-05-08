"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const authController_1 = require("../controllers/authController");
const passport_1 = __importDefault(require("../middlewares/passport/passport"));
const constants_1 = require("../config/constants");
const authRouter = express_1.default.Router();
authRouter.post('/login', passport_1.default.authenticate(constants_1.LOCAL_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(authController_1.login));
authRouter.post('/logout', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(authController_1.logout));
authRouter.post('/refresh', passport_1.default.authenticate(constants_1.REFRESH_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(authController_1.refreshToken));
exports.default = authRouter;
