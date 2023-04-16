import { logger } from "../config/pino.js";
import { verifyToken } from "../utils/auth.js";
import { ForbiddenAccess } from '../errors/ForbiddenAccess.js';
import { Unauthorized } from "../errors/Unauthorized.js";

//ANDA BIEN

export function validateAuth(req, res, next) {
  const token = req.header('auth-token');
  let error = null;
  const { email } = req.body;
  if (!token) {
    error = new ForbiddenAccess(email);
  } else {

    try {
      const verified = verifyToken(token);
      req.user = verified;
      next();
    } catch (e) {
      logger.error(e);
      error = new Unauthorized();
    }
  }
  if (error) {
    logger.error(error);
    next(error);
  }
}