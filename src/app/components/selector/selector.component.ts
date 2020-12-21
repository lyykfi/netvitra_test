import { BehaviorSubject, Subscription } from "rxjs";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

export type SelectedItem = string | boolean | null;

export interface SelectorItem {
    title: string;
    value: SelectedItem;
}

@Component({
    selector: "app-selector",
    templateUrl: "./selector.component.html",
    styleUrls: ["./selector.component.less"]
})
export class SelectorComponent implements OnInit {
    @Input()
    items: SelectorItem[];

    @Output() selectItems: EventEmitter<SelectedItem[]> = new EventEmitter();

    @Input()
    selectAllTitle: string;

    public selectedItems$ = new BehaviorSubject<SelectedItem[]>([]);

    public isAllSelected = false;

    private subscriptions: Subscription[] = [];

    constructor() {
        this.items = [];
        this.selectAllTitle = "";

        this.subscriptions.push(
            this.selectedItems$.subscribe(items => {
                this.selectItems.emit(items);
                this.isAllSelected = items.length === this.items.length;
            })
        );
    }

    ngOnInit(): void {}

    selectAll() {
        this.selectedItems$.next(
            !this.isAllSelected
                ? this.items.map(item => {
                      return item.value;
                  })
                : []
        );
    }

    selectItem(value: string | boolean | null) {
        const values = this.selectedItems$.getValue();
        const indexOf = values.indexOf(value);

        if (indexOf === -1) {
            values.push(value);
        } else {
            values.splice(indexOf, 1);
        }

        this.selectedItems$.next(values);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => {
            item.unsubscribe();
        });
    }
}
