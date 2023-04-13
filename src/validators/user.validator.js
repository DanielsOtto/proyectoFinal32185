import { InvalidArgument } from '../errors/InvalidArgumentError.js';
import { InvalidFormat } from '../errors/InvalidFormat.js';

// REVISAR AL FINAL SI FALTAN MAS VALIDACIONES -- TERMINADO ?

export class UserValidator {
  constructor({ email, password, name, lastname, image }) {
    if (typeof email !== 'string' || !email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InvalidFormat('email');
    this.email = email;

    if (typeof password !== 'string' || !password) throw new InvalidArgument('password');
    if (password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')
    this.password = password;

    if (typeof name !== 'string' || !name) throw new InvalidArgument('name');
    if (name.length >= 85) throw new InvalidFormat('the name is too long. Must be less than 85 characters');
    this.name = name;

    if (typeof lastname !== 'string' || !lastname) throw new InvalidArgument('lastname');
    if (lastname.length >= 85) throw new InvalidFormat('the lastname is too long. Must be less than 85 characters');
    this.lastname = lastname;

    if (typeof image !== 'string' || !image) throw new InvalidArgument('image');
    if (image.length >= 125) throw new InvalidFormat('the image link is too long. Must be less than 125 characters');
    this.image = image;
  }
}
