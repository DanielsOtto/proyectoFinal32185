import { logger } from '../../config/pino.js';
import { User } from '../../models/user.model.js';

// no puedo fijarme si existe o no, xq el getbyId da error y el trycath me manda el error
//habria q ver como usarlo teniendo en cuenta eso

export class UserList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  async save(user) {
    try {
      await this.#dao.save(user.data());
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#dao.getById(id);
      return new User(dto);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findByEmail(email) {
    try {
      return await this.#dao.findByEmail(email);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}