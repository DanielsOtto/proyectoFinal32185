import { InvalidArgument } from "../errors/InvalidArgumentError.js";
import { InvalidFormat } from "../errors/InvalidFormat.js";

// REVISAR AL FINAL SI FALTAN MAS VALIDACIONES -- TERMINADO ?

export class LoginValidator {
  constructor({ email, password }) {
    if (typeof email !== 'string' || !email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InvalidFormat('email');
    this.email = email;

    if (typeof password !== 'string' || !password) throw new InvalidArgument('password');
    if (password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')
    this.password = password;
  }
}