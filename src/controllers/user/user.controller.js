import { logger } from '../../config/pino.js';
import { usersService } from '../../services/user.service/index.js';
import { UserValidator } from '../../validators/user.validator.js';
import { generateToken } from '../../utils/auth.js';

export class UserController {

  async save({ body }, res, next) {
    try {
      new UserValidator(body);
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