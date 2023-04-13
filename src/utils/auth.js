import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/config.js';


export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      idCart: user.idCart
    },
    TOKEN_SECRET,
    { expiresIn: '10m' }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}