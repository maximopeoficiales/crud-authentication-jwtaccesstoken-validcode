import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a7d9fdfb29b6fb",
          pass: "c0605618774271",
        },
      },
      defaults: {
        from: "Codigo Facil <noreply@codigofacil.dev>",
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
