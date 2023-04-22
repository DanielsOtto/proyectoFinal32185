import { logger } from '../../config/pino.js';
import sendMails from '../../utils/mails/index.js';
import createOrderModel from '../../models/order.model/index.js';
import { transformData } from '../../utils/transformData.js';
import { EmptyCartError } from '../../errors/EmptyCartError.js';
import cartList from '../../repositories/cart.repository/index.js';
import orderList from '../../repositories/order.repository/index.js';
import { userMessageBody } from '../../utils/mails/userMessageBody.js';
import { adminMessageBody } from '../../utils/mails/adminMessageBody.js';


export class OrderService {

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
      const cart = await cartList.getById(idCart);
      if (!cart.hasProducts()) throw new EmptyCartError(email);

      const prods = await transformData(cart.products);

      const order = createOrderModel(id, prods);
      await orderList.save(order);

      const sendMail = sendMails();
      const adminMail = adminMessageBody(id, email, idCart, prods, order);
      const userMail = userMessageBody(email, prods, order);
      sendMail.send(adminMail);
      sendMail.send(userMail);

      cart.emptyCart();
      await cartList.updateById(idCart, cart.data());

      return order.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll({ id }) {
    try {
      const orders = await orderList.getAll();
      const customerOrders = this.getOrdersById(orders, id);
      return customerOrders;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}