export class Unauthorized extends Error {
    constructor() {
        super('Unauthorized access');
        this.type = 'UNAUTHORIZED';
    }
}