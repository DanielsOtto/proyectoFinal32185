export class EmptyCartError extends Error {
  constructor(email) {
    super(`Your cart is empty ${email}!`);
    this.type = 'EMPTY_CART';
  }
}