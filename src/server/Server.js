import express from 'express';
import morgan from 'morgan';
import { logger } from '../config/pino.js';
import routerUser from '../routers/user.router.js';
import routerSession from '../routers/session.router.js';
import routerProduct from '../routers/product.router.js';
import routerCart from '../routers/cart.router.js';
import routerOrder from '../routers/order.router.js';
import { errorHandler } from '../middlewares/errorHandler.js';


export class Server {
  #app;
  #server;
  constructor() {
    this.#app = express();

    this.#app.use(morgan('dev'));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use('/api/users', routerUser);
    this.#app.use('/api/sessions', routerSession);
    this.#app.use('/api/products', routerProduct);
    this.#app.use('/api/shoppingcartproducts', routerCart);
    this.#app.use('/api/orders', routerOrder);
    // AVERICUAR SI LOS CONTROLLERS van en plural
    // this.#app.use('/api/4', routerOrder)
    this.#app.use((err, req, res, next) => {
      console.error(err); // no va
      next(err);
    }, errorHandler);

    this.#app.use("*", (req, res) => {
      const err = Error(`Requested path ${req.path} not found`);
      res.status(404).send({
        success: false,
        message: `Requested path ${req.path} not found`,
        stack: err.stack,
      });
    });
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