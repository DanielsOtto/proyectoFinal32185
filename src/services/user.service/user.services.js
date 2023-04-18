import { logger } from '../../config/pino.js';
import { User } from '../../models/user.model.js';
import cartService from '../../services/cart.service/index.js';
// import createCart from '../../models/cart/index.js';
import { encryptPassword } from '../../utils/hashPass.js';
import { userList } from '../../repositories/user.repository/index.js';
// import { EmailAlreadyRegisterError } from '../../errors/EmailAlreadyRegister.js';

// crear USUARIO => asignarle carrito // si existe el correo q hace ? trycatch
// si existe correo ? crear findOne, mandarle correo y si existe da error !!

export class UsersService {
  async save({ email, password, name, lastname, image }) { // recibir { } ?? modificar funcion 
    const object = {
      email,
      password,
      name,
      lastname,
      image
    }
    try {
      // const userSearch = await userList.findByEmail(email);
      await userList.findByEmail(email); // no manda nada es true
      // if (userSearch && userSearch.hasOwnProperty('email')) throw new EmailAlreadyRegisterError(email);
      const password = encryptPassword(object);
      // const cart = createCart(); // esto esta mal, tiene que llamar al repo de carrito, y ahi crearlo
      // const idCart = cart.id;
      const idCart = await cartService.createCart()
      console.log(idCart);
      const user = new User(object);
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