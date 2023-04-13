import createServer from '../server/index.js';
import { logger } from '../config/pino.js';
import { PORT } from '../config/config.js';

const server = createServer();

// aca hay q preguntar si es MongoDB Local (dev) / Mongo Atlas (prod)
//todo esto se persiste en MongoDB Local (dev) / Mongo Atlas (prod)

try {
  await server.connect({ port: PORT });
} catch (e) {
  logger.error(e);
}