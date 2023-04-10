import { logger } from '../../config/pino.js';
import { User } from '../../models/user.model.js';

export class UserList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  async save(user) {
    try {
      await this.#dao.save(user.datos);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      return await this.#dao.getAll();
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

  async deleteById(id) {
    try {
      await this.#dao.deleteById(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteAll() {
    try {
      await this.#dao.deleteAll();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}