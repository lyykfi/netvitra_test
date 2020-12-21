import { Component, OnInit } from "@angular/core";
import {
    SelectedItem,
    SelectorItem
} from "src/app/components/selector/selector.component";

@Component({
    selector: "app-cases-toolbar-item-country",
    templateUrl: "./cases-toolbar-item-country.component.html",
    styleUrls: ["./cases-toolbar-item-country.component.less"]
})
export class CasesToolbarItemCountryComponent implements OnInit {
    items: SelectorItem[];

    selectedItems: SelectedItem[];

    constructor() {
        this.items = [
            {
                title: "Complete",
                value: true
            },
            {
                title: "Incomplete",
                value: false
            }
        ];

        this.selectedItems = [];
    }

    ngOnInit(): void {}

    onSelectItems($event: SelectedItem[]) {
        this.selectedItems = $event;
    }
}
