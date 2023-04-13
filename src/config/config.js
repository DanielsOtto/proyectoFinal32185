import dotenv from 'dotenv';
// // import path from 'path';

dotenv.config({
  // path:
  //   process.env.NODE_ENV === 'prod'
  //     ? '.env'
  //     : 'finish.env'
});

export const PORT = process.env.PORT;

//mongo
export const MONGO_CNS = process.env.MONGODB;


// bcrypt
export const HASH_SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;

// jwt
export const TOKEN_SECRET = process.env.TOKEN_SECRET;



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