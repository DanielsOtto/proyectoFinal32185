import { Router } from 'express';
import { logger } from '../config/pino.js';
// middleware para autenticar valores usuario
import { } from '../controllers/user/user.controller.js';

const routerUser = Router();

routerUser.post('/api/users') // registra un nuevo usuario
routerUser.get('/api/users')
// devuelve los datos del usuario logueado (solo usuarios logueados)

export default routerUser;