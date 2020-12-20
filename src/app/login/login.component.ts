import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

import { AuthResponse, AuthService } from "../auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
    @Input()
    public hide: boolean = true;

    public errorMessage: string = "";

    loginForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl("")
    });

    formSubmit: Observable<AuthResponse>;

    constructor(private authService: AuthService, private router: Router) {
        this.formSubmit = new Observable();
    }

    onChangeHidenState() {
        this.hide = !this.hide;
    }

    ngOnInit(): void {}

    onSubmit() {
        this.authService
            .signIn(this.loginForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("123");
                    this.router.navigate(["/"]);
                },
                error: error => {
                    this.errorMessage = error.error.message;
                    console.log(this.errorMessage);
                }
            });
    }
}
