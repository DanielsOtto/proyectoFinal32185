import { Router } from 'express';
import orderController from '../controllers/order/index.js'
import { validateAuth } from '../middlewares/validateAuth.js';

const routerOrder = Router();

routerOrder.use(validateAuth);
routerOrder.get('/', orderController.getAll);
routerOrder.post('/', orderController.createOrder);

export default routerOrder;