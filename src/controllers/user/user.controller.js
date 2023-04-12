import { logger } from '../../config/pino.js';
import { EmailAlreadyRegisterError } from '../../errors/EmailAlreadyRegister.js';
import { userList } from '../../repositories/user.repository/index.js';
import { usersService } from '../../services/user.service/index.js';
import { UserValidator } from '../../validators/user.validator.js';
import { generateToken } from '../../utils/auth.js';
// FALTAN  VALIDACIONES, no aca! HECHO
// FALTA MANEJADOR DE ERRORES ACA! importar

export class UserController {

  async save({ body }, res, next) {
    try {
      new UserValidator(body);
      const { email } = body;
      const userSearch = await userList.findByEmail(email);
      if (userSearch && userSearch.hasOwnProperty('email')) throw new EmailAlreadyRegisterError(email);

      const user = await usersService.save(body);
      const token = generateToken(user);
      res.status(201).header('auth-token', token).json({ data: token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getById(req, res, next) {
    const { user } = req;
    console.log(`RUTA PROTEGIDA`); // NO VA
    try {
      res.status(200).json({ info: user });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}