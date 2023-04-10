export class UserDto {
  constructor({ id, email, password, name, lastname, image, idCart }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.image = image;
    this.idCart = idCart;
  }
}