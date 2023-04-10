import { createID } from '../utils/createID.js';
// traer Dto


export class Product {
  #id
  #name
  #description
  #price
  #image
  constructor({ name, price, description, image }) {
    this.#id = createID();
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#image = image;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get price() {
    return this.#price;
  }
  get image() {
    return this.#image;
  }

  set name(name) {
    this.#name = name;
  }
  set description(description) {
    this.#description = description;
  }
  set price(price) {
    this.#price = price;
  }
  set image(image) {
    this.#image = image;
  }

  data() {
    return new ProductDto({
      id: this.#id,
      name: this.#name,
      price: this.#price,
      description: this.#description,
      image: this.#image
    })
  }

  updateProduct() { } // es necesario ? o con los setters basta ? ! 
  // EN CUALQUIER CASO HAY Q VALIDAR LA INFO Q ENTRA
} 