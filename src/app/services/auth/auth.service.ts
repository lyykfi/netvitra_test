import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

import { User } from "../../models/user";

export interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private AUTH_TOKEN_ID = "auth";

    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.loggedIn.next(localStorage.getItem(this.AUTH_TOKEN_ID) !== null);
    }

    public signIn(userData: User) {
        return this.http.post<AuthResponse>(`/login`, userData).pipe(
            tap(auth => {
                localStorage.setItem(this.AUTH_TOKEN_ID, auth.token);
                this.loggedIn.next(true);
            })
        );
    }

    public isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    public logout() {
        localStorage.removeItem(this.AUTH_TOKEN_ID);
        this.loggedIn.next(false);
    }
}
