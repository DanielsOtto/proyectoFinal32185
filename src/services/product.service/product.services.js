import { logger } from '../../config/pino.js';
import createProductModel from '../../models/product.model/index.js';


export class ProductService {
  #productRepository;
  constructor(productList) {
    this.#productRepository = productList;
  }

  async save({ name, description, price, image }) {
    const object = {
      name,
      description,
      price,
      image
    };
    try {
      const product = createProductModel(object);
      await this.#productRepository.save(product);
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const product = await this.#productRepository.getById(id);
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      return await this.#productRepository.getAll();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateById(id, data) {
    data.id = id;
    try {
      const product = await this.#productRepository.getById(id);
      product.updateProduct(data);
      await this.#productRepository.updateById(product);
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(id) {
    try {
      await this.#productRepository.deleteById(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}