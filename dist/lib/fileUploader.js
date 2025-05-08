"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = uploadHandler;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dirname = path_1.default.resolve();
function uploadHandler(options) {
    const { uploadFolder = 'public/temp', fileSizeLimit = 100 * 1024 * 1024, memoryFlag = false, allowedTypes = [], } = options;
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path_1.default.join(dirname, uploadFolder));
        },
        filename: (req, file, cb) => {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const ext = path_1.default.extname(file.originalname);
            const baseName = path_1.default.basename(file.originalname, ext);
            const timestamp = Date.now();
            const uniqueFileName = `${baseName}-${timestamp}${ext}`;
            cb(null, uniqueFileName);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (allowedTypes.length === 0) {
            cb(null, true);
            return;
        }
        // const allowedTypes = new RegExp(`^(${allowedExt.join('|')})$`, 'i');
        // const extname = path.extname(file.originalname).toLowerCase();
        // const mimeType = allowedTypes.test(file.mimetype);
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
            return;
        }
        // if (mimeType && allowedTypes.test(extname)) {
        //   cb(null, true);
        //   return;
        // }
        cb(null, false);
    };
    const upload_memory = (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fieldNameSize: 100, fileSize: fileSizeLimit },
        fileFilter: fileFilter,
    });
    if (memoryFlag) {
        return upload_memory;
    }
    const upload_storage = (0, multer_1.default)({
        storage,
        limits: { fieldNameSize: 100, fileSize: fileSizeLimit },
        fileFilter: fileFilter,
    });
    return upload_storage;
}
