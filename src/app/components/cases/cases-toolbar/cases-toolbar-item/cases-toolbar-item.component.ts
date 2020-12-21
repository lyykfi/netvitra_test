import { Component, Input, OnInit } from "@angular/core";

import { SelectedItem } from "./../../../selector/selector.component";

@Component({
    selector: "app-cases-toolbar-item",
    templateUrl: "./cases-toolbar-item.component.html",
    styleUrls: ["./cases-toolbar-item.component.less"]
})
export class CasesToolbarItemComponent implements OnInit {
    @Input()
    title: string;

    @Input()
    selectedTitle: string;

    @Input()
    selected: SelectedItem[] | undefined;

    showFilters: boolean;

    constructor() {
        this.showFilters = false;

        this.title = "";
        this.selectedTitle = "";
    }

    ngOnInit(): void {}

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
}
