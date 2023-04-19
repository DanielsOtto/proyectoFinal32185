import { logger } from '../../config/pino.js';
import createCart from '../../models/cart/index.js';
import { Cart } from '../../models/cart/cart.model.js';

const cart = createCart();// esto va o NO ?? revisar

export class CartList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  // aca guardamos .data() => DTO
  async saveCart(cart) {
    try {
      await this.#dao.save(cart.data());
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  // REVISAR XQ AHI DOS SAVES !
  // aca no retorno nada
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
