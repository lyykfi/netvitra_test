import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { User } from "./user";
import { environment } from "./../environments/environment";

interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private AUTH_TOKEN_ID = "auth";

    constructor(private http: HttpClient) {}

    public signIn(userData: User) {
        return this.http
            .post<AuthResponse>(`${environment.apiUrl}/login`, userData)
            .pipe(
                tap(auth => {
                    localStorage.setItem(this.AUTH_TOKEN_ID, auth.token);
                })
            );
    }

    public isLoggedIn() {
        return localStorage.getItem("ACCESS_TOKEN") !== null;
    }

    public logout() {
        localStorage.removeItem("ACCESS_TOKEN");
    }
}
