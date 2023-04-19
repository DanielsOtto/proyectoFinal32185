import { logger } from "../../config/pino.js";
import sendMails from "../../utils/mails/index.js";
import { Order } from '../../models/order.model.js';
import { EmptyCartError } from "../../errors/EmptyCartError.js";
import cartList from '../../repositories/cart.repository/index.js';
import orderList from '../../repositories/order.repository/index.js';
import { userMessageBody } from '../../utils/mails/userMessageBody.js';
import { adminMessageBody } from '../../utils/mails/adminMessageBody.js';
import { productList } from '../../repositories/product.repository/index.js';


export class OrderService {

  async createOrderProductsArray(array) {
    try {
      const prods = [];

      for (let i = 0; i < array.length; i++) {
        const object = await productList.getById(array[i].id);
        const product = { prod: { ...object.data() }, cant: array[i].amount };
        prods.push(product);
      }
      return prods;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getOrdersById(orders, id) {
    const customerOrders = [];

    for (const order of orders) {
      if (order.idClient === id) {
        customerOrders.push(order);
      }
    }

    return customerOrders;
  }

  async createOrder({ id, email, idCart }) { // email - idCart
    try {
      const cart = await cartList.getById(idCart);
      if (!cart.hasProducts()) throw new EmptyCartError(email);

      const prods = await this.createOrderProductsArray(cart.products);

      const order = new Order(id, prods);
      orderList.save(order);

      const sendMail = sendMails();
      const adminMail = adminMessageBody(id, email, idCart, prods);
      const userMail = userMessageBody(email, prods);
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