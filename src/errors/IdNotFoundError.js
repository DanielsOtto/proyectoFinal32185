export class IdNotFoundError extends Error {
  constructor(id) {
    super(`The ID ${id} was not found!`);
    this.type = 'ID_NOT_FOUND';
  }
}