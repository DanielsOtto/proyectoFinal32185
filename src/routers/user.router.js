import { Router } from 'express';
import { userController } from '../controllers/user/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const routerUser = Router();

routerUser.post('/', userController.createUser) // registra un nuevo usuario 
routerUser.get('/', validateAuth, userController.getById) // 
// devuelve los datos del usuario logueado (solo usuarios logueados)

export default routerUser;