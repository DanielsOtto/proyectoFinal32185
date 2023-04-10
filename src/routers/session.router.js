import { Router } from 'express';
import { sessionController } from '../controllers/session/index.js';


const routerSession = Router();

routerSession.post('/', sessionController.verifyUser);

export default routerSession;