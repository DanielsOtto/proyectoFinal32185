import { Router } from 'express';
import imageUpload from '../middlewares/imageUpload.js';
import imageController from '../controllers/image/index.js';

const routerImage = Router();

routerImage.post('/', imageUpload, imageController.save);

export default routerImage;