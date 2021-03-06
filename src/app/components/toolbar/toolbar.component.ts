import { first } from "rxjs/operators";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.less"]
})
export class ToolbarComponent implements OnInit {
    @Output() burgerClicked = new EventEmitter<void>();

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    onLogout() {
        this.authService
            .logout()
            .pipe(first())
            .subscribe(() => {
                this.router.navigate(["/login"]);
            });
    }

    onBurgerClick() {
        this.burgerClicked.emit();
    }
}
