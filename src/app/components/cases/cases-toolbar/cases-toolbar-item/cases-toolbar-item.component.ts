import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-cases-toolbar-item",
    templateUrl: "./cases-toolbar-item.component.html",
    styleUrls: ["./cases-toolbar-item.component.less"]
})
export class CasesToolbarItemComponent implements OnInit {
    @Input()
    title: string | undefined;

    @Input()
    selected: unknown[] | undefined;

    showFilters: boolean;

    constructor() {
        this.showFilters = false;
    }

    ngOnInit(): void {}

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
}
