import { createTransport } from 'nodemailer';
import { logger } from '../../config/pino.js';
import { NODEMAILER_CONFIG } from '../../config/config.js';


export default class SendMails {
  constructor() {
    this.nodemailerClient = createTransport(NODEMAILER_CONFIG);
  }
  async send(mailOptions) {
    try {
      return await this.nodemailerClient.sendMail(mailOptions);
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
}