"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const passport_1 = __importDefault(require("../middlewares/passport/passport"));
const constants_1 = require("../config/constants");
const contractDocController_1 = require("../controllers/contractDocController");
const fileUploader_1 = require("../lib/fileUploader");
const contractDocRouter = express_1.default.Router();
const typeArray = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/bmp',
    'image/vnd.microsoft.icon',
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'application/zip',
    'application/vnd.rar',
    'application/x-7z-compressed',
    'application/x-hwp',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/rtf',
    'text/html',
    'text/markdown',
];
contractDocRouter.get('/draft', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractDocController_1.getContractChoice));
contractDocRouter.post('/upload', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, fileUploader_1.uploadHandler)({
    uploadFolder: constants_1.DOCUMENT_PATH,
    fileSizeLimit: 50 * 1024 * 1024,
    allowedTypes: typeArray,
}).single('file'), (0, withAsync_1.withAsync)(contractDocController_1.uploadDocument));
contractDocRouter.get('/:contractDocumentId/download', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractDocController_1.downloadDocument));
contractDocRouter.get('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractDocController_1.getDocumentList));
exports.default = contractDocRouter;
