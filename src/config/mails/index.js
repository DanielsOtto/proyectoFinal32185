import SendMails from './nodemailer.js';

export default function sendMail() {
  return new SendMails();
}