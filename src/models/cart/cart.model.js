import { logger } from '../../config/pino.js';
import { CartDto } from '../../dtos/CartDto.js';
import { createID } from '../../utils/createID.js';
import { IdNotFoundError } from '../../errors/IdNotFoundError.js';

export class Cart {
  #id;
  #products;
  constructor({ id = createID(), products = [] } = {}) {
    this.#id = id;
    this.#products = products;
  }

  get id() {
    return this.#id;
  }
  get products() {
    return this.#products;
  }

  /**
   * @param {any} productId
   */
  set addProduct(productId) {
    let product = this.#products.find(prod => prod.id === productId);
    if (!product) {
      product = {
        id: productId,
        amount: 1
      };
      this.#products.push(product);
    } else {
      product.amount++;
      const index = this.#products.findIndex(prod => prod.id === productId);
      this.#products.splice(index, 1, product);
    }
  }

  /**
   * @param {any} id_prod
   */
  set removeProduct(id_prod) {
    try {
      let product = this.#products.find(prod => prod.id === id_prod);
      if (!product) throw new IdNotFoundError(id_prod);
      const index = this.#products.findIndex(prod => prod.id === id_prod);
      if (product.amount > 1) {
        product.amount--;
        this.products.splice(index, 1, product);
      } else {
        this.#products.splice(index, 1);
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  data() {
    return new CartDto({
      id: this.#id,
      products: this.#products,
    });
  };
}