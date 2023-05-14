import { MailerService } from "@nestjs-modules/mailer";
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmailWithDefaultFrom(data: any): Promise<any>;
    sendEmailWithCustomFrom(data: any): Promise<any>;
}
