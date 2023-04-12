import bcrypt from 'bcrypt';
// import { findByEmail } from '../models/userModel.js'; ?? A MODELO NO, AL REPO
import { userList } from '../repositories/user.repository/index.js';
import { HASH_SECRET } from '../config/config.js';
import { logger } from '../config/pino.js';


export function encryptPassword({ password }) {
  return bcrypt.hashSync(password, HASH_SECRET);
}

export async function comparePassword(body) {
  const { email, password } = body;
  try {
    const user = await userList.findByEmail(email);
    if (!user.data() || !user) throw new Error('Credenciales inválidas') // manejo de errores -- info sin detalle
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new Error('Credenciales invalidas'); // manejo de errores
    return user;
  } catch (err) {
    logger.error(err);
    throw new Error("error al validar");
  }
}