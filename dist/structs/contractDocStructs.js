"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadDocumentStruct = void 0;
const superstruct_1 = require("superstruct");
const commonStructs_1 = require("./commonStructs");
exports.DownloadDocumentStruct = (0, superstruct_1.object)({
    contractDocumentId: commonStructs_1.integerString,
});
