import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Account } from "../../models/account";

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

    public signIn(account: Account) {
        return this.http.post<AuthResponse>(`/login`, account).pipe(
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
        return new Observable(observer => {
            localStorage.removeItem(this.AUTH_TOKEN_ID);
            this.loggedIn.next(false);

            observer.next(true);
        });
    }
}
