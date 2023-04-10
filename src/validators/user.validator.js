export class UserValidator {
    constructor({ email, password, name, lastname, image }) {
        // this.email = email;
        // this.password = password;
        this.name = name;
        if (typeof this.name !== 'string' || !this.name) throw new Error('ERROR: The product name has to be a string!');
        if (this.name.length > 50) throw new Error('ERROR: The product name is very longer!')
        this.lastname = lastname;
        if (typeof this.lastname !== 'string' || !this.lastname) throw new Error('ERROR: The product lastname has to be a string!');
        if (this.lastname.length > 50) throw new Error('ERROR: The product lastname is very longer!')
        this.image = image;
        if (typeof this.image !== 'string' || !this.image) throw new Error('ERROR: The product image has to be a string!');
        if (this.image.length > 50) throw new Error('ERROR: The product image is very longer!');
    }
}