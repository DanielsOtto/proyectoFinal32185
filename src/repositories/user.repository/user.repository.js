import { logger } from '../../config/pino.js';
import createUserModel from '../../models/user.model/index.js';


export class UserList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  async save(user) {
    try {
      await this.#dao.save(user);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#dao.getById(id);
      return createUserModel(dto);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findByEmail(email, validate) {
    try {
      return await this.#dao.findByEmail(email, validate);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}