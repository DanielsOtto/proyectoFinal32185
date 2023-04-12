export class ObjectNotUpdated extends Error {
    constructor(object) {
        super(`The ${object} was not updated!`);
        this.type = 'NOT_UPDATED';
    }
}