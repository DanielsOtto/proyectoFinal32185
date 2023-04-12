export class ForbiddenAccess extends Error {
  constructor(email) {
    super(`Forbidden denied: ${email}, nonexistent token!`);
    this.type = 'FORBIDDEN_ACCESS';
  }
}