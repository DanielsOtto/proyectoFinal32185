export class EmptyCollection extends Error {
  constructor(object) {
    super(`No items to display ${object}!`);
    this.type = 'EMPTY_COLLECTION';
  }
}

