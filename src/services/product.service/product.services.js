import { logger } from "../../config/pino.js";
import createProductModel from "../../models/product.model/index.js";
import { productList } from '../../repositories/product.repository/index.js';

export class ProductService {

  async save({ name, description, price, image }) {
    const object = {
      name,
      description,
      price,
      image
    };
    try {
      const product = createProductModel(object);
      await productList.save(product);
      return product.data();
    } catch (e) {
      console.log(e); // no va
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const product = await productList.getById(id);
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      return await productList.getAll();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateById(id, data) {
    data.id = id;
    try {
      const product = await productList.getById(id);
      product.updateProduct(data);
      await productList.updateById(product);
      return product.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(id) {
    try {
      await productList.deleteById(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}