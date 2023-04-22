import { logger } from '../config/pino.js';
import { productList } from '../repositories/product.repository/index.js';


export async function transformData(array) {
  try {
    const prods = [];
    for (let i = 0; i < array.length; i++) {
      const object = await productList.getById(array[i].id);
      const product = { prod: { ...object.data() }, cant: array[i].amount };
      prods.push(product);
    }
    return prods;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}