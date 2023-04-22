import { logger } from '../../config/pino.js';
import { LoginValidator } from '../../validators/login.validator.js';
import sessionService from '../../services/session.service/index.js';


export class SessionController {

  async verifyUser({ body }, res, next) {
    try {
      new LoginValidator(body);
      const token = await sessionService.authenticateUser(body);

      res.status(200).header('Authorization', token).json({ token: token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}