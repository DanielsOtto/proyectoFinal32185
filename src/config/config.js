import dotenv from 'dotenv';
// // import path from 'path';

dotenv.config({
  // path:
  //   process.env.NODE_ENV === 'prod'
  //     ? '.env'
  //     : 'finish.env'
});

export const PORT = process.env.PORT;

// ADMIN


//mongo
export const MONGO_CNS = process.env.MONGODB;

// bcrypt
export const HASH_SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;

// jwt
export const TOKEN_SECRET = process.env.TOKEN_SECRET;

// EMAILS
export const ADMIN = process.env.NODEMAILER_USER;
export const NODEMAILER_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
};
