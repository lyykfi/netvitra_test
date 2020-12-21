import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {
    SelectedItem,
    SelectorItem
} from "src/app/components/selector/selector.component";
import { Case } from "src/app/models/case";
import { CasesToolbarItemComponent } from "../cases-toolbar-item/cases-toolbar-item.component";

@Component({
    selector: "app-cases-toolbar-item-country",
    templateUrl: "./cases-toolbar-item-country.component.html",
    styleUrls: ["./cases-toolbar-item-country.component.less"]
})
export class CasesToolbarItemCountryComponent implements OnInit {
    public items$ = new BehaviorSubject<SelectorItem[]>([]);
    public items: SelectorItem[] = [];

    public allItemsLength = 0;

    selectedItems$ = new BehaviorSubject<SelectedItem[]>([]);

    selectedItems: SelectedItem[] = [];

    selectedChar = "";

    @Input()
    public cases$ = new BehaviorSubject<Case[] | null>(null);

    @Output() selectItems: EventEmitter<SelectedItem[]> = new EventEmitter();

    public activeChars$ = new BehaviorSubject<string[]>([]);

    public selectedChar$ = new Subject<string>();

    defaultSelectedItems: SelectedItem[] = [];

    constructor(
        private cdref: ChangeDetectorRef,
        private elementRef: ElementRef
    ) {}

    @ViewChild("item")
    private itemComponent: CasesToolbarItemComponent | null = null;

    @HostListener("document:mousedown", ["$event"])
    onGlobalClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    ngOnInit(): void {
        this.setDefaultFilter();

        this.items$.subscribe(items => {
            this.items = items;
        });

        this.selectedItems$.subscribe(selectedItems => {
            this.selectedItems = selectedItems;
        });

        this.cases$.subscribe(cases => {
            const chars = new Set<string>([]);
            const allCountries = new Set<string>([]);

            (cases ?? []).forEach(item => {
                allCountries.add(item.user.country);
                chars.add(item.user.country[0].toLocaleLowerCase());
            });

            this.activeChars$.next(Array.from(chars));
            this.defaultSelectedItems = Array.from(allCountries);

            this.allItemsLength = Array.from(allCountries).length;
        });

        this.selectedChar$.subscribe(char => {
            const cases = this.cases$.getValue();
            const countries = new Set<string>([]);

            (cases ?? []).forEach(item => {
                if (item.user.country[0].toLocaleLowerCase() === char) {
                    countries.add(item.user.country);
                }
            });

            this.items$.next(
                Array.from(countries).map(country => {
                    return {
                        title: country,
                        value: country
                    };
                })
            );
        });

        this.selectedItems$.subscribe(items => {
            this.selectItems.emit(items);
        });
    }

    onSelectItems($event: SelectedItem[]) {
        this.selectedItems$.next($event);
    }

    close() {
        this.itemComponent?.close();
    }

    setDefaultFilter() {
        const cases = this.cases$.getValue();
        const countries = new Set<string>([]);

        (cases ?? []).forEach(item => {
            countries.add(item.user.country);
        });

        this.defaultSelectedItems = Array.from(countries);

        this.cdref.detectChanges();
    }

    onSelectChar($event: string) {
        this.selectedChar$.next($event);
    }

    onDeleteItem(item: SelectedItem) {
        const selectedItems = this.selectedItems$.getValue();
        const indexOf = selectedItems.indexOf(item);

        selectedItems.splice(indexOf, 1);

        this.selectedItems$.next([...selectedItems]);
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}
