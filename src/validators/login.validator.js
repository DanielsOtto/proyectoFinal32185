import { InvalidFormat } from "../errors/InvalidFormat.js";
import { InvalidArgument } from "../errors/InvalidArgumentError.js";


export class LoginValidator {
  constructor({ email, password }) {
    this.email = email;
    if (typeof this.email !== 'string' || !this.email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new InvalidFormat('email');
    if (/\s/.test(this.email)) throw new InvalidFormat('the email should not contain white spaces');

    this.password = password;
    if (typeof this.password !== 'string' || !this.password) throw new InvalidArgument('password');
    if (this.password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')
    if (/\s/.test(this.password)) throw new InvalidFormat('the password should not contain white spaces');
  }
}