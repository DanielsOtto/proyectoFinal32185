import express from 'express';
import morgan from 'morgan';
import { logger } from '../config/pino.js';
import routerCart from '../routers/cart.router.js';
import routerUser from '../routers/user.router.js';
import routerImage from '../routers/image.router.js';
import routerOrder from '../routers/order.router.js';
import routerSession from '../routers/session.router.js';
import routerProduct from '../routers/product.router.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';
import { handleNotFount } from '../middlewares/handleNotFound.middleware.js';


export class Server {
  #app;
  #server;
  constructor() {
    this.#app = express();

    this.#app.use(morgan('dev'));
    this.#app.use(express.static('public'));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use('/api/images', routerImage);
    this.#app.use('/api/users', routerUser);
    this.#app.use('/api/sessions', routerSession);
    this.#app.use('/api/products', routerProduct);
    this.#app.use('/api/shoppingcartproducts', routerCart);
    this.#app.use('/api/orders', routerOrder);
    this.#app.use(errorMiddleware, errorHandler);
    this.#app.use("*", handleNotFount);
  }

  async connect({ port = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(port, () => {
        logger.info(`conectado en el puerto ${port}`)
        resolve({ port });
      });
      this.#server.on('error', e => {
        logger.error(`Error de conexión: ${e}`);
        reject(e);
      });

    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(e => {
        if (e) {
          logger.error(`Error de conexión: ${e}`);
          reject(e);
        } else {
          resolve(true);
        }
      });
    });
  }
}