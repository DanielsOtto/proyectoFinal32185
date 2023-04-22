import { logger } from '../../config/pino.js';
import createProductModel from '../../models/product.model/index.js';


export class ProductList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  async save(product) {
    try {
      await this.#dao.save(product.data());
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#dao.getById(id);
      return createProductModel(dto);
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

  async updateById(product) {
    try {
      await this.#dao.updateById(product.id, product.data());
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