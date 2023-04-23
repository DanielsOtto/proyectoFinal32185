import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, EXPIRES_IN } from '../config/config.js';


export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      idCart: user.idCart
    },
    TOKEN_SECRET,
    { expiresIn: EXPIRES_IN }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}