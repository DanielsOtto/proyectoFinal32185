import { createTransport } from 'nodemailer';
import { NODEMAILER_CONFIG } from '../../config/config.js';
import { logger } from '../../config/pino.js';


export default class SendMails {
  constructor() {
    this.nodemailerClient = createTransport(NODEMAILER_CONFIG);
  }
  async send(mailOptions) {
    try {
      return await this.nodemailerClient.sendMail(mailOptions);
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);// manejador de errores
    }
  }
}