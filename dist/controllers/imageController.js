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
exports.uploadImage = void 0;
const constants_1 = require("../config/constants");
const EmptyUploadError_1 = __importDefault(require("../lib/errors/EmptyUploadError"));
/**
 * @openapi
 * /images/upload:
 *   post:
 *     summary: 이미지 업로드
 *     description: 사용자가 이미지를 업로드하고, 업로드된 이미지의 다운로드 URL을 반환합니다.
 *     tags:
 *       - Image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: 업로드할 이미지 파일을 포함합니다.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *     responses:
 *       201:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: 업로드된 이미지의 다운로드 URL
 *               example:
 *                 imageUrl: "http://example.com/images/abc123.jpg"
 *       400:
 *         description: 파일이 업로드되지 않았습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        throw new EmptyUploadError_1.default();
    }
    const downloadUrl = `${process.env.PROTOCOL}://${req.get('host')}/${constants_1.IMAGE_PATH}/${file.filename}`;
    res.status(201).json({ imageUrl: downloadUrl });
});
exports.uploadImage = uploadImage;
