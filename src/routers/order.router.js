import { Router } from 'express';
import orderController from '../controllers/order/index.js'
import { validateAuth } from '../middlewares/validateAuth.js';

const routerOrder = Router();

routerOrder.use(validateAuth);
routerOrder.get('/', orderController.getAll);
routerOrder.post('/', orderController.createOrder);

export default routerOrder;


// GET /api/orders: devuelve todas las ordenes de un usuario (solo usuarios logueados)
// POST /api/orders: crea una nueva orden (compra todo el contenido de un carrito y lo vacía, solo usuarios logueados)