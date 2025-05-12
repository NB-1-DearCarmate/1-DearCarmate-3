"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const company_1 = require("../controllers/company");
const companyRouter = express_1.default.Router();
companyRouter.post('/', (0, withAsync_1.withAsync)(company_1.postCompany));
exports.default = companyRouter;
