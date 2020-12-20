import { Component, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import { SidenavService } from "src/app/services/sidenav/sidenav.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})
export class AppComponent {
    isLoggedIn$: Observable<boolean>;

    @ViewChild("drawer", { static: false }) set elemOnHTML(
        elemOnHTML: MatDrawer
    ) {
        if (!!elemOnHTML) {
            this.sidenavService.setDrawer(elemOnHTML);
        }
    }

    constructor(
        private authService: AuthService,
        private sidenavService: SidenavService
    ) {
        this.isLoggedIn$ = this.authService.isLoggedIn();
    }

    onSidenavTrigger() {
        this.sidenavService.toggle();
    }
}
