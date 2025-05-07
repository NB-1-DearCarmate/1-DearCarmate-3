import nodemailer from 'nodemailer';
import { EMAIL_PW } from '../config/constants';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jbyoum3@gmail.com', // 본인 이메일
    pass: EMAIL_PW, // 앱 비밀번호
  },
});

export async function sendEmail(email: string) {
  try {
    const info = await transporter.sendMail({
      from: '"Dear Carmate" <jbyoum3@gmail.com>',
      to: email,
      subject: '계약서 등록 안내',
      text: '계약서 등록 안내',
      html: '<b>안녕하세요!</b><br>Dear Carmate입니다.<br>진행하신 계약에 대한 계약서가 등록되었습니다.',
    });

    console.log('메일 전송 성공:', info.messageId);
  } catch (error) {
    console.error('메일 전송 실패:', error);
  }
}
