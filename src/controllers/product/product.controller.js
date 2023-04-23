import { logger } from '../../config/pino.js';
import productService from '../../services/product.service/index.js';
import { ProductValidator } from '../../validators/product.validator.js';


export class ProductController {

  async save({ body }, res, next) {
    try {
      new ProductValidator(body);
      const product = await productService.save(body);
      res.status(201).json({ Saved: product });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getById({ params }, res, next) {
    const { id } = params;
    try {
      const product = await productService.getById(id);
      res.status(200).json({ Searched: product });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await productService.getAll();
      res.status(200).json({ All: products });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async updateById({ params, body }, res, next) {
    const { id } = params;
    try {
      const product = await productService.updateById(id, body);
      res.status(200).json({ Upload: product });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async deleteById({ params }, res, next) {
    const { id } = params;
    try {
      await productService.deleteById(id);
      res.status(200).json({ message: 'deletion done' });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}