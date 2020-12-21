import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { SelectedItem } from "src/app/components/selector/selector.component";
import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    QueryList,
    ViewChildren
} from "@angular/core";
import { CasesToolbarItemStatusComponent } from "./cases-toolbar-item-status/cases-toolbar-item-status.component";
import { CasesToolbarItemCountryComponent } from "./cases-toolbar-item-country/cases-toolbar-item-country.component";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";

export interface CasesFilters {
    state: SelectedItem[];
    country: SelectedItem[];
    searchText: string;
}

@AutoUnsubscribe()
@Component({
    selector: "app-cases-toolbar",
    templateUrl: "./cases-toolbar.component.html",
    styleUrls: ["./cases-toolbar.component.less"]
})
export class CasesToolbarComponent implements OnInit {
    filterSub: Subscription;

    searchSub: Subscription;

    searchTextControl = new FormControl("");

    filters = new BehaviorSubject<CasesFilters>({
        state: [],
        country: [],
        searchText: ""
    });

    @ViewChildren("filterComponents") filterComponents!: QueryList<
        CasesToolbarItemStatusComponent | CasesToolbarItemCountryComponent
    >;

    @Output() updateFilters: EventEmitter<CasesFilters> = new EventEmitter();

    constructor() {
        this.filterSub = this.filters.asObservable().subscribe(filters => {
            this.updateFilters.emit(filters);
        });

        this.searchSub = this.searchTextControl.valueChanges.subscribe(text => {
            const filters = this.filters.getValue();
            this.filters.next({
                ...filters,
                searchText: text
            });
        });
    }

    ngOnInit(): void {}

    onSelect($event: SelectedItem[], key: string) {
        const filters = this.filters.getValue();

        this.filters.next({
            ...filters,
            [key]: $event
        });
    }

    onReset() {
        this.filterComponents.forEach(filter => {
            filter?.setDefaultFilter();
            filter?.close();
        });

        this.searchTextControl.reset();
    }

    ngOnDestroy() {}
}
