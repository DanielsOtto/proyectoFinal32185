import { createID } from '../../utils/createID.js';
import { UserDto } from '../../dtos/UserDto.js';


// el que crea el usuario, antes crea un carrito y le da al usuario ese ID de carrito
//entonces el ID de carrito NO deberia de ir en el modelo, deberia de ir en el servicio ?

export class User {
  #id;
  #email;
  #password;
  #name;
  #lastname;
  #image;
  #idCart;
  constructor({ email, password, name, lastname, image, idCart }) {
    this.#id = createID();
    this.#email = email;
    this.#password = password;
    this.#name = name;
    this.#lastname = lastname;
    this.#image = image;
    this.#idCart = idCart;
  };

  get id() {
    return this.#id;
  }
  get email() {
    return this.#email;
  }
  get password() {
    return this.#password;
  }
  get name() {
    return this.#name;
  }
  get lastname() {
    return this.#lastname;
  }
  get image() {
    return this.#image;
  }
  get idCart() {
    return this.#idCart;
  }

  set email(email) {
    this.#email = email;
  }
  set password(password) {
    this.#password = password;
  }
  set name(name) {
    this.#name = name;
  }
  set lastname(lastname) {
    this.#lastname = lastname;
  }
  set image(image) {
    this.#image = image;
  }
  set idCart(idCart) {
    this.#idCart = idCart;
  }

  data() {
    return new UserDto({
      id: this.#id,
      email: this.#email,
      password: this.#password,
      name: this.#name,
      lastname: this.#lastname,
      image: this.#image,
      idCart: this.#idCart,
    });
  }
}