import { logger } from '../../config/pino.js';
import createCart from '../../models/cart/index.js';
import { transformData } from '../../utils/transformData.js';
import { EmptyCartError } from '../../errors/EmptyCartError.js';
import cartList from '../../repositories/cart.repository/index.js';
import { productList } from '../../repositories/product.repository/index.js';

export class CartService {

  async createCart() {
    try {
      const cart = createCart();
      await cartList.save(cart.data());
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
      await cartList.updateById(idCart, cart.data());
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(email, idCart) {
    try {
      const cart = await cartList.getById(idCart);
      if (cart.products.length === 0) throw new EmptyCartError(email);

      return await transformData(cart.products);
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
      await cartList.updateById(idCart, cart.data());
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}