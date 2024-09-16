import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Logger } from 'winston';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor(@Inject('winston') private readonly logger: Logger) {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendTaskReminderEmail(to: string, subject: string, text: string) {
    try {
      this.logger.info('Trying to send reminder email');
      console.log(to, subject);
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to, // Recipient address
        subject, // Subject line
        text, // Email body
      };

      return this.transporter.sendMail(mailOptions);
    } catch (err) {
      this.logger.error('Error sending mail..', err);
    }
  }
}
