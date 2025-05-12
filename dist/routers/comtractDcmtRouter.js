"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const passport_1 = __importDefault(require("../middlewares/passport/passport"));
const constants_1 = require("../config/constants");
const contractDcmtController_1 = require("../controllers/contractDcmtController");
const fileUploader_1 = require("../lib/fileUploader");
const contractDcmtRouter = express_1.default.Router();
const extArray = [
    'jpg',
    'png',
    'webp',
    'gif',
    'avif',
    'bmp',
    'ico',
    'txt',
    'pdf',
    'docx',
    'xlsx',
    'csv',
    'zip',
    'rar',
    '7z',
    'hwp',
];
contractDcmtRouter.get('/draft', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractDcmtController_1.getContractChoice));
contractDcmtRouter.post('/upload', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, fileUploader_1.uploadHandler)({
    uploadFolder: constants_1.DOCUMENT_PATH,
    fileSizeLimit: 50 * 1024 * 1024,
    allowedExt: extArray,
}).single('contractDocument'), (0, withAsync_1.withAsync)(contractDcmtController_1.uploadDocument));
contractDcmtRouter.get('/:contractDocumentId/download', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractDcmtController_1.downloadDocument));
contractDcmtRouter.get('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractDcmtController_1.getDocumentList));
exports.default = contractDcmtRouter;
