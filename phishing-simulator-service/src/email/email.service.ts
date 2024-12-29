import { Injectable } from '@nestjs/common';
import * as mailer from 'nodemailer';
import { Phisihing } from 'src/phishing/schemas/phishing.schema';

const { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } = process.env;

@Injectable()
export class EmailService {
  private transporter: mailer.Transporter;
  constructor() {
    this.transporter = mailer.createTransport({
      host: EMAIL_HOST,
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(attempt: Phisihing): Promise<boolean> {
    try {
      let res = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: attempt.recipient,
        subject: 'New Email',
        html: attempt.body,
      });
      console.log(res)
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
