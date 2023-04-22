import { logger } from '../../config/pino.js';
import { Cart } from '../../models/cart/cart.model.js';


export class CartList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  async save(cart) {
    try {
      await this.#dao.save(cart);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#dao.getById(id);
      return new Cart(dto);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateById(idCart, cart) {
    try {
      await this.#dao.updateById(idCart, cart);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById() {
    try {
      await this.#dao.deleteById();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}