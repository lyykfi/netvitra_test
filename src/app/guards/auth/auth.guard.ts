import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
        return this.authService.isLoggedIn().pipe(
            map(status => {
                console.log(status);
                if (!status) {
                    this.router.navigate(["/login"]);
                }
                return status;
            })
        );
    }
}
