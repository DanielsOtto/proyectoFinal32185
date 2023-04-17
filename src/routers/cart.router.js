import { Router } from 'express';
import cartController from '../controllers/cart/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const cartRouter = Router();

//revisar rutas
cartRouter.use(validateAuth);
cartRouter.post('/', cartController.save);
cartRouter.get('/', cartController.getAllProducts);
cartRouter.delete('/:id', cartController.deleteById);

export default cartRouter;
// GET /api/shoppingcartproducts: devuelve los productos de un carrito (solo usuarios logueados)
// POST /api/shoppingcartproducts: agrega producto al carrito segun su id (solo usuarios logueados)
// DELETE /api/shoppingcartproducts/{id}: quita un producto de un carrito (solo usuarios logueados)