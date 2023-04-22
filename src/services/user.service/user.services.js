import { logger } from '../../config/pino.js';
import { encryptPassword } from '../../utils/hashPass.js';
import cartService from '../../services/cart.service/index.js';
import createUserModel from '../../models/user.model/index.js';
import { userList } from '../../repositories/user.repository/index.js';


export class UsersService {
  #userRepository;
  constructor() {
    this.#userRepository = userList; // no lo estoy usando todavia
  }

  async createUser({ email, password, name, lastname, image }) {
    const object = {
      email,
      password,
      name,
      lastname,
      image
    }
    try {
      await userList.findByEmail(email);
      const password = encryptPassword(object);
      const idCart = await cartService.createCart()
      console.log(idCart);
      const user = createUserModel(object);
      user.password = password;
      user.idCart = idCart;
      await userList.save(user.data());
      return user.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const user = await userList.getById(id);
      return user.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}