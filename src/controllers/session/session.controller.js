import { logger } from '../../config/pino.js';
import { Unauthorized } from '../../errors/Unauthorized.js';
import { generateToken } from '../../utils/auth.js';
import { comparePassword } from '../../utils/hashPass.js';
import { LoginValidator } from '../../validators/login.validator.js';

// controlador SESSIONES, sirve de login, REQUIERE usuario y contraseña del usuario
// estos datos TIENEN que validarse, y a su vez el email debe de encontrarse en la bd
// Y la contraseña tiene q ser la misma que el hash guardado


export class SessionController {

  async verifyUser({ body }, res, next) {
    //vamos a dejarle este nombre al controlador del endpoint de session con metodo POST
    try {
      new LoginValidator(body);
      const user = await comparePassword(body);
      if (!user) {
        throw new Unauthorized('Invalid credentials!');
      }
      const token = generateToken(user)
      res.status(200).header('auth-token', token).json({ data: { token } });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}