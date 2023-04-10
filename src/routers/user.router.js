import { Router } from 'express';
// middleware para autenticar valores usuario
import { userController } from '../controllers/user/index.js';

const routerUser = Router();

routerUser.post('/', userController.save) // registra un nuevo usuario
// routerUser.get('/api/users')
// devuelve los datos del usuario logueado (solo usuarios logueados)

export default routerUser;