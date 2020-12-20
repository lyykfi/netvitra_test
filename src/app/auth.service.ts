import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { User } from "./user";

export interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private AUTH_TOKEN_ID = "auth";

    constructor(private http: HttpClient) {}

    public signIn(userData: User) {
        return this.http.post<AuthResponse>(`/login`, userData).pipe(
            tap(auth => {
                localStorage.setItem(this.AUTH_TOKEN_ID, auth.token);
            })
        );
    }

    public isLoggedIn() {
        return localStorage.getItem(this.AUTH_TOKEN_ID) !== null;
    }

    public logout() {
        localStorage.removeItem(this.AUTH_TOKEN_ID);
    }
}
