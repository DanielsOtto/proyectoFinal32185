import { logger } from '../../config/pino.js';
import cartService from '../../services/cart.service/index.js';

export class CartController {

  async save({ body, user }, res, next) {
    const { idCart } = user;
    const { id_prod } = body;
    try {
      const product = await cartService.save(idCart, id_prod);
      res.status(200).json({ Adding: product });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async getAllProducts({ user }, res, next) {
    const { email, idCart } = user;
    try {
      const products = await cartService.getById(email, idCart);
      res.status(200).json({ Products: products });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async deleteById({ user, params }, res, next) {
    const { idCart } = user;
    const { id } = params;
    try {
      const product = await cartService.deleteById(idCart, id);
      res.status(200).json({ Removing: product });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}