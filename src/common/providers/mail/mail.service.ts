import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailWithDefaultFrom(data: any) {
    const message = {
      to: data.To,
      subject: data.Subject,
      text: data.Message,
    };
    return await this.mailerService.sendMail(message);
  }

  async sendEmailWithCustomFrom(data: any) {
    const message = {
      from: data.From,
      to: data.To,
      subject: data.Subject,
      text: data.Text,
    };
    return await this.mailerService.sendMail(message);
  }
}
