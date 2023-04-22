import { logger } from '../../config/pino.js';
import { usersService } from '../../services/user.service/index.js';
import { UserValidator } from '../../validators/user.validator.js';
import { generateToken } from '../../utils/auth.js';

export class UserController {

  async createUser({ body }, res, next) {
    try {
      new UserValidator(body);
      const user = await usersService.createUser(body);
      const token = generateToken(user);
      res.status(201).set('Authorization', token).json({ token: token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getById(req, res, next) {
    const { user } = req;
    try {
      const userInfo = await usersService.getById(user.id);
      delete userInfo.password;
      res.status(200).json({ info: userInfo });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}