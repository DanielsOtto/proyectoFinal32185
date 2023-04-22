import { Order } from './order.model.js';

export default function createOrderModel(id, prods) {
  return new Order(id, prods);
}