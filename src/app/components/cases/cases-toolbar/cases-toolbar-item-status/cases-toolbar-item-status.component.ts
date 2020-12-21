import { Component, OnInit } from "@angular/core";
import { SelectorItem } from "src/app/components/selector/selector.component";

@Component({
    selector: "app-cases-toolbar-item-status",
    templateUrl: "./cases-toolbar-item-status.component.html",
    styleUrls: ["./cases-toolbar-item-status.component.less"]
})
export class CasesToolbarItemStatusComponent implements OnInit {
    items: SelectorItem[];

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
    }

    ngOnInit(): void {}
}
