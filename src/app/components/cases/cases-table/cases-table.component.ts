import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { Case } from "src/app/models/case";
import { MatSort } from "@angular/material/sort";
import { CasesFilters } from "../cases-toolbar/cases-toolbar.component";
import { MatDialog } from "@angular/material/dialog";
import { CaseEditDialogComponent } from "../case-edit-dialog/case-edit-dialog.component";

interface CaseTableItem {
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    country: string;
    isComplete: boolean;
    id: number;
}

@AutoUnsubscribe()
@Component({
    selector: "app-cases-table",
    templateUrl: "./cases-table.component.html",
    styleUrls: ["./cases-table.component.less"]
})
export class CasesTableComponent implements OnInit {
    @Input()
    public cases$ = new BehaviorSubject<Case[] | null>(null);

    public cases: Case[] | null = null;

    @Input()
    public filters = new Subject<CasesFilters>();

    @ViewChild(MatPaginator, { static: false }) set elemOnHTML(
        elemOnHTML: MatPaginator
    ) {
        if (!!elemOnHTML) {
            this.datasource.paginator = elemOnHTML;
        }
    }

    @ViewChild(MatSort, { static: false }) set elemOnSortHTML(
        elemOnHTML: MatSort
    ) {
        if (!!elemOnHTML) {
            this.datasource.sort = elemOnHTML;
        }
    }

    @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

    public displayedColumns = [
        "select",
        "firstName",
        "lastName",
        "birthDate",
        "country",
        "isComplete",
        "actions"
    ];

    datasource: MatTableDataSource<CaseTableItem> = new MatTableDataSource();

    datasourceSub: Subscription | undefined;

    filtersSub: Subscription | undefined;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
        this.datasourceSub = this.cases$.subscribe(items => {
            this.datasource.data = (items ?? []).map(item => {
                return {
                    isComplete: item.isComplete,
                    firstName: item.user.firstName,
                    lastName: item.user.lastName,
                    birthDate: item.user.birthDate,
                    country: item.user.country,
                    id: item.id
                };
            });

            this.cases = items;
        });

        this.filtersSub = this.filters.subscribe(items => {
            this.datasource.filter = JSON.stringify(items);
        });
    }

    ngAfterViewInit() {
        this.datasource.filterPredicate = (data, filter) => {
            const filters: CasesFilters = JSON.parse(filter);
            filters.searchText = filters.searchText?.trim().toLocaleLowerCase();

            let isValid = false;

            if (filters.searchText) {
                const props: (keyof CaseTableItem)[] = [
                    "firstName",
                    "lastName",
                    "country"
                ];

                props.forEach(prop => {
                    if (
                        (data[prop] as string)
                            .trim()
                            .toLocaleLowerCase()
                            .includes(filters.searchText)
                    ) {
                        isValid = true;
                    }
                });
            } else {
                isValid = true;
            }

            if (isValid && filters.state.length) {
                const states = filters.state;

                if (!states.includes(data.isComplete)) {
                    isValid = false;
                }
            }

            if (isValid && filters.country.length) {
                const countries = filters.country;

                if (!countries.includes(data.country)) {
                    isValid = false;
                }
            }

            return isValid;
        };
    }

    ngOnDestroy() {}

    onShowModal(id: number) {
        const caseItem = this.cases?.find(item => {
            return item.id === id;
        });

        if (caseItem) {
            const dialogRef = this.dialog.open(CaseEditDialogComponent, {
                width: "650px",
                data: caseItem
            });
        }
    }
}
