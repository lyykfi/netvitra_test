import { Component, OnInit } from "@angular/core";

import { SelectorItem } from "src/app/components/selector/selector.component";
import { SelectedItem } from "src/app/components/selector/selector.component";

@Component({
    selector: "app-cases-toolbar-item-status",
    templateUrl: "./cases-toolbar-item-status.component.html",
    styleUrls: ["./cases-toolbar-item-status.component.less"]
})
export class CasesToolbarItemStatusComponent implements OnInit {
    items: SelectorItem[];

    selectedItems: SelectedItem[];

    defaultSelectedItems: SelectedItem[] = [];

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

    ngOnInit(): void {
        this.setDefaultFilter();
    }

    setDefaultFilter() {
        this.defaultSelectedItems = this.items.map(item => {
            return item.value;
        });
    }

    onSelectItems($event: SelectedItem[]) {
        this.selectedItems = $event;
    }
}
