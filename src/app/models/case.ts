import { User } from "./user";

export class Case {
    user: User;

    isComplete: boolean;

    constructor() {
        this.user = new User();
        this.isComplete = false;
    }
}
