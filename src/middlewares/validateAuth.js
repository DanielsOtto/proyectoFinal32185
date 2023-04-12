import { logger } from "../config/pino.js";
import { verifyToken } from "../utils/auth.js";
import { ForbiddenAccess } from '../errors/ForbiddenAccess.js';
import { Unauthorized } from "../errors/Unauthorized.js";

//ANDA BIEN

export function validateAuth(req, res, next) {
  const token = req.header('auth-token');
  let error = null;
  if (!token) {
    error = new ForbiddenAccess();
  } else {

    try {
      const verified = verifyToken(token);
      req.user = verified;
      next();
    } catch (e) {
      error = new Unauthorized();
      logger.error(e)
    }
  }
  if (error) {
    throw error;
  }
}