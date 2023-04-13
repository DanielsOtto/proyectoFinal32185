export class ObjectNotDeleted extends Error {
  constructor(object) {
    super(`The ${object} was not deleted!`);
    this.type = 'NOT_DELETED';
  }
}