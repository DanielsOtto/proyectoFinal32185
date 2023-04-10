export class UserDto {
  constructor({ id, name, price, description, image, idCart }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.idCart = idCart;
  }
}