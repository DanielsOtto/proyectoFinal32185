import { logger } from '../../config/pino.js';
import { User } from '../../models/user.model.js';
import { userList } from '../../repositories/users/index.js';

export class UsersService {

  async save(object) {
    const user = new User(object);
    try {
      await userList.save(user);
      return user.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      return await userList.getAll();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      return await userList.getById(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(id) {
    try {
      await userList.deleteById(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteAll() {
    try {
      await userList.deleteAll();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}