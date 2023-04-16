import bcrypt from 'bcrypt';
// import { findByEmail } from '../models/userModel.js'; ?? A MODELO NO, AL REPO
import { userList } from '../repositories/user.repository/index.js';
import { Unauthorized } from '../errors/Unauthorized.js';
import { HASH_SECRET } from '../config/config.js';
import { logger } from '../config/pino.js';

export function encryptPassword({ password }) {
  return bcrypt.hashSync(password, HASH_SECRET);
}

export async function comparePassword(body) {
  const { email, password } = body;
  console.log(email, password);
  try {
    const user = await userList.findByEmail(email);
    if (!user) {
      return null;
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new Unauthorized('Invalid credentials!');
    return user;
  } catch (e) {
    logger.error(e);
  }
}