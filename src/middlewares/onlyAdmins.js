import { logger } from '../config/pino.js';
import { ADMIN } from '../config/config.js';
import { ForbiddenAccess } from '../errors/ForbiddenAccess.js';

export function onlyAdmins(req, res, next) {
  const { email } = req.user;
  if (email === ADMIN) {
    next();
  }
  else {
    const err = new ForbiddenAccess();
    logger.error(err);
    next(err);
  }
}