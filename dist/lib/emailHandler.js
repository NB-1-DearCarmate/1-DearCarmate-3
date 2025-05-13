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
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const constants_1 = require("../config/constants");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'gusxo999@gmail.com', // 본인 이메일
        pass: constants_1.EMAIL_PW, // 앱 비밀번호
    },
});
function sendEmail(email, pathArray) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const attachments = pathArray.map((filePath) => ({
                path: filePath,
            }));
            const info = yield transporter.sendMail({
                from: '"Dear Carmate" <gusxo999@gmail.com>',
                to: email,
                subject: '계약서 등록 안내',
                text: '계약서 등록 안내',
                html: '<b>안녕하세요!</b><br>Dear Carmate입니다.<br>진행하신 계약에 대한 계약서가 등록되었습니다.',
                attachments,
            });
            console.log('메일 전송 성공:', info.messageId);
        }
        catch (error) {
            console.error('메일 전송 실패:', error);
        }
    });
}
