import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { IMailServiceSendMail } from './interfaces/mail-service.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ email, number }: IMailServiceSendMail): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Stage Pick 이메일 인증번호입니다.',
        text: '인증번호를 입력해주세요.',
        html: `<b>인증번호: ${number}</b>`,
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
