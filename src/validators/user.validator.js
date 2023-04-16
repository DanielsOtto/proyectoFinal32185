import { InvalidArgument } from '../errors/InvalidArgumentError.js';
import { InvalidFormat } from '../errors/InvalidFormat.js';

// REVISAR AL FINAL SI FALTAN MAS VALIDACIONES -- TERMINADO ?

export class UserValidator {
  constructor({ email, password, name, lastname, image }) {
    this.email = email;
    if (typeof this.email !== 'string' || !this.email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new InvalidFormat('email');
    if (this.email.replace(/\s+/g, '').length === 0) throw new InvalidArgument('email');

    this.password = password;
    if (typeof this.password !== 'string' || !this.password) throw new InvalidArgument('password');
    if (this.password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')
    if (this.password.replace(/\s+/g, '').length === 0) throw new InvalidArgument('password');

    this.name = name;
    if (typeof this.name !== 'string' || !this.name) throw new InvalidArgument('name');
    if (this.name.length >= 85) throw new InvalidFormat('the name is too long. Must be less than 85 characters');
    if (this.name.replace(/\s+/g, '').length === 0) throw new InvalidArgument('name');

    this.lastname = lastname;
    if (typeof this.lastname !== 'string' || !this.lastname) throw new InvalidArgument('lastname');
    if (this.lastname.length >= 85) throw new InvalidFormat('the lastname is too long. Must be less than 85 characters');
    if (this.lastname.replace(/\s+/g, '').length === 0) throw new InvalidArgument('lastname');

    this.image = image;
    if (typeof this.image !== 'string' || !this.image) throw new InvalidArgument('image');
    if (this.image.length >= 125) throw new InvalidFormat('the image link is too long. Must be less than 125 characters');
    if (this.image.replace(/\s+/g, '').length === 0) throw new InvalidArgument('image');
    //validar el formato de la imagen
  }
}
