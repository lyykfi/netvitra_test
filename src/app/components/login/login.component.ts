import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
    @Input()
    public hide: boolean = true;

    public errorMessage: string = "";

    public loginForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl("")
    });

    constructor(private authService: AuthService, private router: Router) {}

    onChangeHidenState() {
        this.hide = !this.hide;
    }

    ngOnInit(): void {
        this.authService.logout();
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService
                .signIn(this.loginForm.value)
                .pipe(first())
                .subscribe({
                    next: () => this.router.navigate(["/"]),
                    error: error => (this.errorMessage = error.error.message)
                });
        }
    }
}
