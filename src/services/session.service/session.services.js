import { logger } from '../../config/pino.js';
import { generateToken } from '../../utils/auth.js';
import { comparePassword } from '../../utils/hashPass.js';
import { Unauthorized } from '../../errors/Unauthorized.js';

export class SessionService {

  async authenticateUser({ email, password }) {
    try {
      const user = await comparePassword(email, password);
      if (!user) {
        throw new Unauthorized('Invalid credentials!!');
      }
      return generateToken(user);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}