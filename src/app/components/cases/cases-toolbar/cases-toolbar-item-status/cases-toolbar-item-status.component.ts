import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";

import { SelectorItem } from "src/app/components/selector/selector.component";
import { SelectedItem } from "src/app/components/selector/selector.component";
import { CasesToolbarItemComponent } from "../cases-toolbar-item/cases-toolbar-item.component";

@Component({
    selector: "app-cases-toolbar-item-status",
    templateUrl: "./cases-toolbar-item-status.component.html",
    styleUrls: ["./cases-toolbar-item-status.component.less"]
})
export class CasesToolbarItemStatusComponent implements OnInit {
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

    defaultSelectedItems: SelectedItem[] = [];

    @Output() selectItems: EventEmitter<SelectedItem[]> = new EventEmitter();

    @ViewChild("item")
    private itemComponent: CasesToolbarItemComponent | null = null;

    constructor(private cdref: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.setDefaultFilter();
    }

    onSelectItems($event: SelectedItem[]) {
        this.selectedItems = $event;
        this.selectItems.emit($event);
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    close() {
        this.itemComponent?.close();
    }

    setDefaultFilter() {
        this.defaultSelectedItems = this.items.map(item => {
            return item.value;
        });

        this.cdref.detectChanges();
    }
}
