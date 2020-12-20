import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})
export class AppComponent {
    isLoggedIn$: Observable<boolean>;

    constructor(private authService: AuthService) {
        this.isLoggedIn$ = this.authService.isLoggedIn();
    }
}
