import { Injectable } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

@Injectable({
    providedIn: "root"
})
export class SidenavService {
    private drawer: MatDrawer | null = null;

    constructor() {}

    public setDrawer(drawer: MatDrawer | null) {
        this.drawer = drawer;
    }

    public toggle(): void {
        console.log(this.drawer);
        this.drawer?.toggle();
    }
}
