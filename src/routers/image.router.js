import { Router } from 'express';
import imageController from '../controllers/image/index.js';
import imageUpload from '../middlewares/imageUpload.js';

const routerImage = Router();

routerImage.post('/', imageUpload, imageController.save);

export default routerImage;