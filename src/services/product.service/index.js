import { ProductService } from './product.services.js';
import { productList } from '../../repositories/product.repository/index.js';


const productService = new ProductService(productList);

export default productService;