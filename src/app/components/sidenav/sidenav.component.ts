import { Component, OnInit } from "@angular/core";
import {
    SideNavItem,
    SidenavService
} from "src/app/services/sidenav/sidenav.service";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.less"]
})
export class SidenavComponent implements OnInit {
    links: SideNavItem[];

    constructor(sidenavService: SidenavService) {
        this.links = sidenavService.getItems();
    }

    ngOnInit(): void {}
}
