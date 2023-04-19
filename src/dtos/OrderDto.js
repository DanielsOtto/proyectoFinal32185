export class OrderDto {
  constructor({ id, date, idClient, products }) {
    this.id = id;
    this.date = date;
    this.idClient = idClient;
    this.products = products;
  }
}