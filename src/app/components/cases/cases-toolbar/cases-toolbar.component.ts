import { SelectedItem } from "src/app/components/selector/selector.component";
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { CasesToolbarItemStatusComponent } from "./cases-toolbar-item-status/cases-toolbar-item-status.component";
import { CasesToolbarItemCountryComponent } from "./cases-toolbar-item-country/cases-toolbar-item-country.component";

@Component({
    selector: "app-cases-toolbar",
    templateUrl: "./cases-toolbar.component.html",
    styleUrls: ["./cases-toolbar.component.less"]
})
export class CasesToolbarComponent implements OnInit {
    filters: Record<string, SelectedItem[]> = {
        state: [],
        country: []
    };

    @ViewChildren("filterComponents") filterComponents!: QueryList<
        CasesToolbarItemStatusComponent | CasesToolbarItemCountryComponent
    >;

    constructor() {}

    ngOnInit(): void {}

    onSelectStatus($event: SelectedItem[]) {
        this.filters.state = $event;
    }

    onReset() {
        this.filterComponents.forEach(filter => {
            filter?.setDefaultFilter();
            filter?.close();
        });
    }
}
