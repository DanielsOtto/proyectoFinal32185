import { logger } from '../../config/pino.js';
import { User } from '../../models/user.model.js';
import { userList } from '../../repositories/users/index.js';
import createCart from '../../models/cart/index.js';
import { encryptPassword } from '../../utils/hashPass.js';

// crear USUARIO => asignarle carrito // si existe el correo q hace ? trycatch

// si existe correo ? crear findOne, mandarle correo y si existe da error !!

export class UsersService {
  async save(body) {
    try {
      // const email = ''  findOne
      // si existe return error
      const password = encryptPassword(body.password);
      const cart = createCart(); // esto esta mal, tiene que llamar al repo de carrito, y ahi crearlo
      const idCart = cart.id;
      const user = new User(body);
      user.password = password;
      user.idCart = idCart;
      await userList.save(user);
      return user.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      return await userList.getById(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}