"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyIdParamStruct = exports.PatchCompanyBodyStruct = exports.CreateCompanyBodyStruct = void 0;
const superstruct_1 = require("superstruct");
const commonStructs_1 = require("./commonStructs");
exports.CreateCompanyBodyStruct = (0, superstruct_1.object)({
    companyName: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    companyCode: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
});
exports.PatchCompanyBodyStruct = (0, superstruct_1.object)({
    companyName: (0, superstruct_1.optional)((0, superstruct_1.nonempty)((0, superstruct_1.string)())),
    companyCode: (0, superstruct_1.optional)((0, superstruct_1.nonempty)((0, superstruct_1.string)())),
});
exports.CompanyIdParamStruct = (0, superstruct_1.object)({
    companyId: commonStructs_1.integerString,
});
