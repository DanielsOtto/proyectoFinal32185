import { logger } from '../config/pino.js';
import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgumentError.js';


export class ProductValidator {
  constructor({ name, description, price, image }) {
    this.name = name;
    if (typeof this.name !== 'string' || !this.name) throw new InvalidFormat('product name');
    if (this.name.length < 2 || this.name.length > 85) throw new InvalidArgument('name. Cannot be less than 3 and greater than 85.');
    if (this.name.replace(/\s+/g, '').length === 0) throw new InvalidArgument('product name');

    this.description = description;
    if (typeof this.description !== 'string' || !this.description) throw new InvalidFormat('product description');
    if (this.description.length > 125) throw new InvalidArgument('the description is very extensive');
    if (this.description.replace(/\s+/g, '').length === 0) throw new InvalidArgument('product description');

    this.price = price;
    if (!Number.isInteger(this.price)) throw new InvalidFormat('price must be an integer');
    if (this.price <= 0) throw new InvalidArgument('the price have to be 1 or more');

    this.image = image;
    if (typeof this.image !== 'string') throw new InvalidFormat('the image must be a string');
    if (this.image.length > 125) throw new InvalidArgument('the link is very extensive');
    if (this.image.replace(/\s+/g, '').length === 0) throw new InvalidArgument('product image');
    try {
      this.image = new URL(image)
      if (this.image.href.indexOf('images') === -1) throw new InvalidArgument('wrong url!');
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}