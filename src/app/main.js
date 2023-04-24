import createServer from '../server/index.js';
import { logger } from '../config/pino.js';
import { PORT } from '../config/config.js';

const server = createServer();


try {
  await server.connect({ port: PORT });
} catch (e) {
  logger.error(e);
}