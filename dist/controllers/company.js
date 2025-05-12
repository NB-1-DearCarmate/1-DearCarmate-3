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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCompany = void 0;
const company_1 = require("../services/company");
const postCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, companyCode } = req.body;
    const company = yield (0, company_1.createCompany)({ companyName, companyCode });
    res.status(201).json(company);
});
exports.postCompany = postCompany;
