import { Router } from 'express';
import cartController from '../controllers/cart/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const routerCart = Router();

//revisar rutas
routerCart.use(validateAuth);
routerCart.post('/', cartController.save);
routerCart.get('/', cartController.getAllProducts);
routerCart.delete('/:id', cartController.deleteById);

export default routerCart;
// GET /api/shoppingcartproducts: devuelve los productos de un carrito (solo usuarios logueados)
// POST /api/shoppingcartproducts: agrega producto al carrito segun su id (solo usuarios logueados)
// DELETE /api/shoppingcartproducts/{id}: quita un producto de un carrito (solo usuarios logueados)