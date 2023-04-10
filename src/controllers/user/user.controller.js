import { logger } from '../../config/pino.js';
import { usersService } from '../../services/user.service/index.js';
// las validaciones van en un middleware, no aca!
// randomUUID esta en el modelo, no aca!
// MANEJADOR DE ERRORES ACA! importar

export class UserController {

  async save({ body }, res) {
    try {
      const user = await usersService.save(body);
      res.status(201).json(user);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById({ params }, res) {
    const { id } = params;
    try {
      const user = await usersService.getById(id);
      res.status(200).json(user.data());
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  // async deleteById({ params }, res) {
  //   const { id } = params;
  //   try {
  //     await usersService.deleteById(id);
  //     res.sendStatus(200);
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }
}



