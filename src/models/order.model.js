import { createID } from "../utils/createID.js";
import { OrderDto } from '../dtos/OrderDto.js';

export class Order {
  #id;
  #date;
  #idClient;
  #products;
  constructor(idClient, products) {
    this.#id = createID();
    this.#date = new Date();
    this.#idClient = idClient;
    this.#products = products;
  }

  get id() {
    return this.#id;
  }

  data() {
    return new OrderDto({
      id: this.#id,
      date: this.#date,
      idClient: this.#idClient,
      products: this.#products
    });
  }

}


// {
//   id: 1;
//   fecha: (timestamp);
//   idCliente: 1;
//   prods: [
//     { prod: { id, name, description, price, image, }, cant: 2 },
//     { prod: { id, name, description, price, image, }, cant: 1 }
//   ]
// }