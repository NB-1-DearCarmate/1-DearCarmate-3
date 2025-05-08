"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../config/constants");
const dashBoardController_1 = require("../controllers/dashBoardController");
const dashBoardRouter = express_1.default.Router();
dashBoardRouter.get('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(dashBoardController_1.getDashBoard));
exports.default = dashBoardRouter;
