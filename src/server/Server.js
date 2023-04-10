import express from 'express';
import morgan from 'morgan';
import { logger } from '../config/pino.js';

export class Server {
  #app;
  #server;
  constructor() {
    this.#app = express();

    this.#app.use(morgan('dev'));
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.json());
    // this.#app.use('/api');
    // this.#app.use('/api/1')//ruta
    // this.#app.use('/api/2')//ruta
    // this.#app.use('/api/3')//ruta
    // this.#app.use('/api/4')//ruta
    // this.#app.use('/api/E')//ruta manejador errores
    // this.#app.use('*')//ruta paginas q no existen
  }

  async connect({ port = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(port, () => {
        logger.info(`conectado al puerto ${port}`);
        resolve({ port });
      });
      this.#server.on('error', e => {
        logger.error(e)
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