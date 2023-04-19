import { logger } from '../../config/pino.js';
import { InvalidArgument } from '../../errors/InvalidArgumentError.js';

export class ImageController {
  async save(req, res, next) {
    const { file } = req;
    try {
      if (!file) throw new InvalidArgument();
      const image = `images/${file.filename}`;
      const publicUrl = `${req.get('host')}/${image}`;
      res.status(200).json({ image: publicUrl });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}