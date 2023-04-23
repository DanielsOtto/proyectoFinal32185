import { Router } from 'express';
import cartController from '../controllers/cart/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const routerCart = Router();

routerCart.use(validateAuth);
routerCart.post('/', cartController.save);
routerCart.get('/', cartController.getAllProducts);
routerCart.delete('/:id', cartController.deleteById);

export default routerCart;