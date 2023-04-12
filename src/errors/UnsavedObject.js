export class UnsavedObject extends Error {
    constructor(dto) {
        super(`The object couldn´t be saved: ${dto}!`);
        this.type = 'UNSAVED_OBJECT';
    }
}