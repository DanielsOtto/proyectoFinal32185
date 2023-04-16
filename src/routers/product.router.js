import { Router } from 'express';
import productController from '../controllers/product/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';
import { onlyAdmins } from '../middlewares/onlyAdmins.js';
// falta USAR validacion de autenticacion y roles (CREAR)

const routerProduct = Router();

routerProduct.get('/', productController.getAll);
routerProduct.get('/:id', productController.getById);
// con permiso admin, autenticado
routerProduct.use(validateAuth, onlyAdmins);
routerProduct.post('/', productController.save);
routerProduct.put('/:id', productController.updateById);
routerProduct.delete('/:id', productController.deleteById);

export default routerProduct;