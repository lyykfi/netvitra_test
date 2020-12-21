import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import {
    SelectedItem,
    SelectorItem
} from "src/app/components/selector/selector.component";
import { Case } from "src/app/models/case";

@Component({
    selector: "app-cases-toolbar-item-country",
    templateUrl: "./cases-toolbar-item-country.component.html",
    styleUrls: ["./cases-toolbar-item-country.component.less"]
})
export class CasesToolbarItemCountryComponent implements OnInit {
    items: SelectorItem[] = [
        {
            title: "Complete",
            value: true
        },
        {
            title: "Incomplete",
            value: false
        }
    ];

    selectedItems: SelectedItem[] = [];

    selectedChar = "";

    @Input()
    public cases$ = new Subject<Case[]>();

    public activeChars$ = new Subject<string[]>();

    constructor() {}

    ngOnInit(): void {
        this.cases$.subscribe(cases => {
            const chars = new Set<string>([]);

            cases.forEach(item => {
                chars.add(item.user.country[0].toLocaleLowerCase());
            });

            this.activeChars$.next(Array.from(chars));
        });
    }

    onSelectItems($event: SelectedItem[]) {
        this.selectedItems = $event;
    }

    close() {}

    setDefaultFilter() {}

    onSelectChar($event: string) {
        this.selectedChar = $event;
        console.log(this.selectedChar);
    }
}
