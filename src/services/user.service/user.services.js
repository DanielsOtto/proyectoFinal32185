import { logger } from '../../config/pino.js';
import { encryptPassword } from '../../utils/hashPass.js';
import cartService from '../../services/cart.service/index.js';
import createUserModel from '../../models/user.model/index.js';


export class UsersService {
  #userRepository;
  constructor(userList) {
    this.#userRepository = userList;
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
      await this.#userRepository.findByEmail(email);
      const password = encryptPassword(object);
      const idCart = await cartService.createCart()
      const user = createUserModel(object);
      user.password = password;
      user.idCart = idCart;
      await this.#userRepository.save(user.data());
      return user.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const user = await this.#userRepository.getById(id);
      return user.data();
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}