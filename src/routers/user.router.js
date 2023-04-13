import { Router } from 'express';
import { userController } from '../controllers/user/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const routerUser = Router();

routerUser.post('/', userController.save) // registra un nuevo usuario -- ESTA MAL LO DE CREAR CARRITO
routerUser.get('/', validateAuth, userController.getById) // INCOMPLETO
// devuelve los datos del usuario logueado (solo usuarios logueados)

export default routerUser;