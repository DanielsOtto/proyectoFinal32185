import { InvalidArgument } from '../../errors/InvalidArgumentError.js';
import { InvalidFormat } from '../../errors/InvalidFormat.js';
import { ProductDto } from '../../dtos/ProductDto.js';
import { createID } from '../../utils/createID.js';
import { logger } from '../../config/pino.js';


export class Product {
  #id
  #name
  #description
  #price
  #image
  constructor({ id = createID(), name, price, description, image }) {
    this.#id = id;
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
    });
  }

  updateProduct(data) {
    if (data.name) {
      const phrase = data.name.replace(/\s+/g, '');
      if (typeof data.name !== 'string') throw new InvalidFormat('the name must be a string');
      if (phrase.length === 0) throw new InvalidArgument('nothing entered in the name');
      if (data.name.length < 2 || data.name.length > 85) throw new InvalidArgument('name. Cannot be less than 3 and greater than 85.');
      this.#name = data.name;
    }
    if (data.price) {
      if (!Number.isInteger(data.price)) throw new InvalidFormat('price must be an integer');
      if (data.price <= 0) throw new InvalidArgument('the price have to be 1 or more');
      this.#price = data.price;
    }
    if (data.description) {
      const phrase = data.description.replace(/\s+/g, '');
      if (typeof data.description !== 'string') throw new InvalidFormat('the description must be a string');
      if (phrase.length === 0) throw new InvalidArgument('nothing entered in the description');
      if (data.description.length > 100) throw new InvalidArgument('the description is very extensive.');
      this.#description = data.description;
    }
    if (data.image) {
      const phrase = data.image.replace(/\s+/g, '');
      if (typeof data.image !== 'string') throw new InvalidFormat('the image must be a string');
      if (phrase.length === 0) throw new InvalidArgument('nothing entered in the image');
      if (data.image.length > 125) throw new InvalidArgument('the link is very extensive');
      try {
        this.image = new URL(data.image)
        if (this.image.href.indexOf('images') === -1) throw new InvalidArgument('wrong url!');
      } catch (e) {
        logger.error(e);
        throw e;
      }
      this.image = data.image;
    }
  }
} 