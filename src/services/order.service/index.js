import { OrderService } from './order.services.js';
import cartList from '../../repositories/cart.repository/index.js';
import orderList from '../../repositories/order.repository/index.js';

const orderService = new OrderService(orderList, cartList);

export default orderService;