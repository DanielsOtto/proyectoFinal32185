import { createID } from '../../utils/createID.js';

export class Cart {
  #id;
  #products;
  constructor() {
    this.#id = createID();
    this.#products = [];
  }

  get id() {
    return this.#id;
  }
  get products() {
    return this.#products;
  }

  // set para productos ?
  set products(product) {
    // si el objeto existe, agrega uno
    // si no, agrega un objeto con uno de cantidad
  }

  data() {
    return new CartDto({
      id: this.#id,
      products: this.#products,
    });
  };
}