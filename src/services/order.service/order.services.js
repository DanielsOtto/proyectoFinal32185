import { logger } from '../../config/pino.js';
import sendMails from '../../utils/mails/index.js';
import { transformData } from '../../utils/transformData.js';
import { EmptyCartError } from '../../errors/EmptyCartError.js';
import createOrderModel from '../../models/order.model/index.js';
import { userMessageBody } from '../../utils/mails/userMessageBody.js';
import { adminMessageBody } from '../../utils/mails/adminMessageBody.js';


export class OrderService {
  #orderRepository;
  #cartRepository;
  constructor(orderList, cartList) {
    this.#orderRepository = orderList;
    this.#cartRepository = cartList;
  }

  getOrdersById(orders, id) {
    const customerOrders = [];

    for (const order of orders) {
      if (order.idClient === id) {
        customerOrders.push(order);
      }
    }
    return customerOrders;
  }

  async createOrder({ id, email, idCart }) {
    try {
      const cart = await this.#cartRepository.getById(idCart);
      if (!cart.hasProducts()) throw new EmptyCartError(email);

      const prods = await transformData(cart.products);

      const order = createOrderModel(id, prods);
      await this.#orderRepository.save(order);

      const sendMail = sendMails();
      const adminMail = adminMessageBody(id, email, idCart, prods, order);
      const userMail = userMessageBody(email, prods, order);
      sendMail.send(adminMail);
      sendMail.send(userMail);

      cart.emptyCart();
      await this.#cartRepository.updateById(idCart, cart.data());

      return order.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll({ id }) {
    try {
      const orders = await this.#orderRepository.getAll();
      const customerOrders = this.getOrdersById(orders, id);
      return customerOrders;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}