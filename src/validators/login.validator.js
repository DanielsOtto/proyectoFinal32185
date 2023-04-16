import { InvalidArgument } from "../errors/InvalidArgumentError.js";
import { InvalidFormat } from "../errors/InvalidFormat.js";

// REVISAR AL FINAL SI FALTAN MAS VALIDACIONES -- TERMINADO ?

export class LoginValidator {
  constructor({ email, password }) {
    this.email = email;
    if (typeof this.email !== 'string' || !this.email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new InvalidFormat('email');
    if (this.email.replace(/\s+/g, '').length === 0) throw new InvalidArgument('email');

    this.password = password;
    if (typeof this.password !== 'string' || !this.password) throw new InvalidArgument('password');
    if (this.password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')
    if (this.password.replace(/\s+/g, '').length === 0) throw new InvalidArgument('password');
  }
}