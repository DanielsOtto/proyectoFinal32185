import createServer from '../server/index.js';
import { logger } from '../config/pino.js';

const server = createServer();
const PORT = 8080 // iniciando - borrar

// aca hay q preguntar si es MongoDB Local (dev) / Mongo Atlas (prod)
//todo esto se persiste en MongoDB Local (dev) / Mongo Atlas (prod)

try {
  await server.connect({ port: PORT });
} catch (e) {
  logger.error(e);
}