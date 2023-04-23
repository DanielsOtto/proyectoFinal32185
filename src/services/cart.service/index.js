import { CartService } from './cart.services.js';
import cartList from '../../repositories/cart.repository/index.js';
import { productList } from '../../repositories/product.repository/index.js';

const cartService = new CartService(cartList, productList);

export default cartService;