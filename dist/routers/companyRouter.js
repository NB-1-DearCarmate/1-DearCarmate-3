"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const companyController_1 = require("../controllers/companyController");
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../config/constants");
const companyRouter = express_1.default.Router();
companyRouter.get('/users', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(companyController_1.getCompanyUsers));
companyRouter.patch('/:companyId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(companyController_1.patchCompany));
companyRouter.delete('/:companyId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(companyController_1.deleteCompany));
companyRouter.get('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(companyController_1.getCompanyList));
companyRouter.post('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(companyController_1.postCompany));
exports.default = companyRouter;
