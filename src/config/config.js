import dotenv from 'dotenv';
// // import path from 'path';

dotenv.config({
  // path:
  //   process.env.NODE_ENV === 'prod'
  //     ? '.env'
  //     : 'finish.env'
});

export const MONGO_CNS = process.env.MONGODB;


// EMAILS
export const NODEMAILER_CONFIG = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,  // estan en otro archivo 
    pass: process.env.NODEMAILER_PASS
  }
};

// PREGUNTA: LOS CORREOS CON GMAIL, o con los de prueba alcanza ?