export class InvalidArgument extends Error {
  constructor(message) {
    super(`Invalid or missing argument: ${message}`);
    this.type = 'INVALID_ARGUMENT';
  }
}