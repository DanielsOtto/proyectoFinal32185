import { logger } from "../../config/pino.js";
import orderService from '../../services/order.service/index.js';

export class OrderController {
  // NO HAY PARAMS
  // AMBAS  USERS LOGUEADOS
  async createOrder({ user }, res, next) {
    try {
      const order = await orderService.createOrder(user);
      // //crea una nueva orden
      // //compra todo el contenido del carrito
      // // guarda orden en mongo
      // // vacia el carrito


      // //BORRAR
      // res.sendStatus(201);
      res.status(201).json(order);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getAll({ user }, res, next) {
    try {
      const orders = await orderService.getAll(user);

      res.status(200).json(orders);
      //devuelve todas las ordenes de un usuario
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}