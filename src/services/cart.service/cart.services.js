import { logger } from '../../config/pino.js';
import createCart from '../../models/cart/index.js';
import cartList from '../../repositories/cart.repository/index.js';
import { productList } from '../../repositories/product.repository/index.js';

export class CartService {

  async createCart() {
    try {
      const cart = createCart();
      await cartList.saveCart(cart);
      return cart.id;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async save(idCart, id_prod) {
    try {
      const product = await productList.getById(id_prod);
      const cart = await cartList.getById(idCart);
      cart.addProduct = id_prod;
      await cartList.updateById(idCart, cart.data()); // data() deberia ser en repos ?
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(idCart) {
    try {
      const cart = await cartList.getById(idCart);
      return cart.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(idCart, id) {
    try {
      const product = await productList.getById(id);
      const cart = await cartList.getById(idCart);
      cart.removeProduct = id;
      await cartList.updateById(idCart, cart.data()); // revisar otrodos los servicios, .data() en repo
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}