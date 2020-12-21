import { Component, Input, OnInit } from "@angular/core";

export interface SelectorItem {
    title: string;
    value: string | boolean | null;
}

@Component({
    selector: "app-selector",
    templateUrl: "./selector.component.html",
    styleUrls: ["./selector.component.less"]
})
export class SelectorComponent implements OnInit {
    @Input()
    items: SelectorItem[];

    @Input()
    selectAll: boolean;

    constructor() {
        this.items = [];
        this.selectAll = false;
    }

    ngOnInit(): void {}
}
