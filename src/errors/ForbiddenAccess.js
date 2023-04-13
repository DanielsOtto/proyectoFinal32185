export class ForbiddenAccess extends Error {
  constructor(email) {
    if (email) {
      super(`Forbidden access: ${email}, nonexistent token!`);
    } else {
      super(`Forbidden access, nonexistent token!`);
    }
    this.type = 'FORBIDDEN_ACCESS';
  }
}