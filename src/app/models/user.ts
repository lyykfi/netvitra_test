export class User {
    avatar: string | undefined;

    firstName: string;

    lastName: string;

    birthDate: Date | undefined;

    country: string;

    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.country = "";
    }
}
