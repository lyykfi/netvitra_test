import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
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
    public items$ = new BehaviorSubject<SelectorItem[]>([]);
    public items: SelectorItem[] = [];

    selectedItems: SelectedItem[] = [];

    selectedChar = "";

    @Input()
    public cases$ = new BehaviorSubject<Case[]>([]);

    public activeChars$ = new Subject<string[]>();

    public selectedChar$ = new Subject<string>();

    constructor() {}

    ngOnInit(): void {
        this.items$.subscribe(items => {
            this.items = items;
        });

        this.cases$.subscribe(cases => {
            const chars = new Set<string>([]);

            cases.forEach(item => {
                chars.add(item.user.country[0].toLocaleLowerCase());
            });

            this.activeChars$.next(Array.from(chars));
        });

        this.selectedChar$.subscribe(char => {
            const cases = this.cases$.getValue();
            const countries = new Set<string>([]);

            cases.forEach(item => {
                if (item.user.country[0].toLocaleLowerCase() === char) {
                    countries.add(item.user.country);
                }
            });

            console.log(countries);

            this.items$.next(
                Array.from(countries).map(country => {
                    return {
                        title: country,
                        value: country
                    };
                })
            );
        });
    }

    onSelectItems($event: SelectedItem[]) {
        this.selectedItems = $event;
    }

    close() {}

    setDefaultFilter() {}

    onSelectChar($event: string) {
        this.selectedChar$.next($event);
    }
}
