import { Router } from 'express';
import { userController } from '../controllers/user/index.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const routerUser = Router();

routerUser.post('/', userController.createUser);
routerUser.get('/', validateAuth, userController.getById);

export default routerUser;