import { logger } from '../config/pino.js';
import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgumentError.js';


export class UserValidator {
  constructor({ email, password, name, lastname, image }) {
    this.email = email;
    if (typeof this.email !== 'string' || !this.email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new InvalidFormat('email');
    if (/\s/.test(this.email)) throw new InvalidFormat('the email should not contain white spaces');

    this.password = password;
    if (typeof this.password !== 'string' || !this.password) throw new InvalidArgument('password');
    if (/\s/.test(this.password)) throw new InvalidFormat('the password should not contain white spaces');
    if (this.password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')

    this.name = name;
    if (typeof this.name !== 'string' || !this.name) throw new InvalidArgument('name');
    if (this.name.length >= 85) throw new InvalidFormat('the name is too long. Must be less than 85 characters');
    if (/\s/.test(this.name)) throw new InvalidFormat('the name should not contain white spaces');

    this.lastname = lastname;
    if (typeof this.lastname !== 'string' || !this.lastname) throw new InvalidArgument('lastname');
    if (this.lastname.length >= 85) throw new InvalidFormat('the lastname is too long. Must be less than 85 characters');
    if (/\s/.test(this.lastname)) throw new InvalidFormat('the lastname should not contain white spaces');

    this.image = image;
    if (typeof this.image !== 'string' || !this.image) throw new InvalidArgument('image');
    if (this.image.length >= 125) throw new InvalidFormat('the image link is too long. Must be less than 125 characters');
    if (/\s/.test(this.image)) throw new InvalidFormat('the image should not contain white spaces');
    try {
      this.image = new URL(image)
      if (this.image.href.indexOf('images') === -1) throw new InvalidArgument('wrong url!');
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}