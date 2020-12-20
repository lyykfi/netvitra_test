import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.less"]
})
export class SidenavComponent implements OnInit {
    constructor() {}

    links = [
        {
            title: "Cases",
            link: "/"
        },
        {
            title: "Create"
        },
        {
            title: "Admin"
        }
    ];

    ngOnInit(): void {}
}
