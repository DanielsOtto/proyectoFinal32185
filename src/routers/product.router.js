import { Router } from 'express';
import { onlyAdmins } from '../middlewares/onlyAdmins.js';
import { validateAuth } from '../middlewares/validateAuth.js';
import productController from '../controllers/product/index.js';


const routerProduct = Router();

routerProduct.get('/', productController.getAll);
routerProduct.get('/:id', productController.getById);
routerProduct.use(validateAuth, onlyAdmins);
routerProduct.post('/', productController.save);
routerProduct.put('/:id', productController.updateById);
routerProduct.delete('/:id', productController.deleteById);

export default routerProduct;