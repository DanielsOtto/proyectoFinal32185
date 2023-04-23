import { logger } from '../../config/pino.js';
import orderService from '../../services/order.service/index.js';

export class OrderController {
  async createOrder({ user }, res, next) {
    try {
      const order = await orderService.createOrder(user);
      res.status(201).json(order);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getAll({ user }, res, next) {
    try {
      const orders = await orderService.getAll(user);
      if (orders.length === 0) {
        res.status(204).end();
      } else {
        res.status(200).json(orders);
      }
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}