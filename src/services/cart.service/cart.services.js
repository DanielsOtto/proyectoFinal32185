import { logger } from '../../config/pino.js';
import createCart from '../../models/cart/index.js';
import { transformData } from '../../utils/transformData.js';
import { EmptyCartError } from '../../errors/EmptyCartError.js';


export class CartService {
  #productsRepository;
  #cartRepository;
  constructor(cartList, productList) {
    this.#cartRepository = cartList;
    this.#productsRepository = productList;
  }

  async createCart() {
    try {
      const cart = createCart();
      await this.#cartRepository.save(cart.data());
      return cart.id;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async save(idCart, id_prod) {
    try {
      const product = await this.#productsRepository.getById(id_prod);
      const cart = await this.#cartRepository.getById(idCart);
      cart.addProduct = id_prod;
      await this.#cartRepository.updateById(idCart, cart.data());
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(email, idCart) {
    try {
      const cart = await this.#cartRepository.getById(idCart);
      if (cart.products.length === 0) throw new EmptyCartError(email);

      return await transformData(cart.products);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(idCart, id) {
    try {
      const product = await this.#productsRepository.getById(id);
      const cart = await this.#cartRepository.getById(idCart);
      cart.removeProduct = id;
      await this.#cartRepository.updateById(idCart, cart.data());
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}