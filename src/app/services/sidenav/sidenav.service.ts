import { Injectable } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";

export interface SideNavItem {
    title: string;
    link?: string;
}

@Injectable({
    providedIn: "root"
})
export class SidenavService {
    private drawer: MatDrawer | null = null;

    private links: SideNavItem[] = [
        {
            title: $localize`Cases`,
            link: "/"
        },
        {
            title: $localize`Create`
        },
        {
            title: $localize`Admin`
        }
    ];

    constructor() {}

    public setDrawer(drawer: MatDrawer | null) {
        this.drawer = drawer;
    }

    public toggle(): void {
        this.drawer?.toggle();
    }

    public getItems() {
        return this.links;
    }
}
