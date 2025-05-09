"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../config/constants");
const withAsync_1 = require("../lib/withAsync");
const fileUploader_1 = require("../lib/fileUploader");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
const typeArray = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/bmp',
    'image/svg+xml',
    'image/vnd.microsoft.icon',
];
router.post('/upload', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, fileUploader_1.uploadHandler)({
    uploadFolder: constants_1.IMAGE_PATH,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedTypes: typeArray,
}).single('file'), (0, withAsync_1.withAsync)(imageController_1.uploadImage));
exports.default = router;
