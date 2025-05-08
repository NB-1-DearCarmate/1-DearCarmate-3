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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCsv = void 0;
exports.uploadCsvFile = uploadCsvFile;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const constants_1 = require("../config/constants");
const BadRequestError_1 = __importDefault(require("../lib/errors/BadRequestError"));
const ALLOWED_MIME_TYPES = ['text/csv', 'application/vnd.ms-excel'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
exports.uploadCsv = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, constants_1.PUBLIC_PATH);
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname);
            const filename = `${(0, uuid_1.v4)()}${ext}`;
            cb(null, filename);
        },
    }),
    limits: {
        fileSize: FILE_SIZE_LIMIT,
    },
    fileFilter: function (req, file, cb) {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            const err = new BadRequestError_1.default('Only CSV files are allowed');
            return cb(err);
        }
        cb(null, true);
    },
});
function uploadCsvFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = req.get('host');
        if (!host) {
            throw new BadRequestError_1.default('Host is required');
        }
        if (!req.file) {
            throw new BadRequestError_1.default('File is required');
        }
        const filePath = path_1.default.join(host, constants_1.STATIC_PATH, req.file.filename);
        const url = `http://${filePath}`;
        res.send({ url });
    });
}
