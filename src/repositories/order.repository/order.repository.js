import { logger } from "../../config/pino.js";
// modelos

export class OrderList {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  // guardar order
  async save(order) {
    try {
      await this.#dao.save(order.data());
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  //obtener todos falta
  async getAll() {
    try {
      return await this.#dao.getAll();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}