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
      // const search = await this.#dao.getById(user.id)
      // console.log(search);
      // if (search) throw new Error('no crear cuenta, ya tiene una') // manejador de errores
      await this.#dao.save(user.data());
    } catch (e) {
      console.log(e);
      // logger.error(e);
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