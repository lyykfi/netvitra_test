import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Subject, Subscription } from "rxjs";
import { Case } from "src/app/models/case";
import { MatSort } from "@angular/material/sort";

@AutoUnsubscribe()
@Component({
    selector: "app-cases-table",
    templateUrl: "./cases-table.component.html",
    styleUrls: ["./cases-table.component.less"]
})
export class CasesTableComponent implements OnInit {
    @Input()
    public cases: Subject<Case[]> | null = null;

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
        console.log(elemOnHTML);
        if (!!elemOnHTML) {
            this.datasource.sort = elemOnHTML;
        }
    }

    @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

    public displayedColumns = [
        "select",
        "firstName",
        "lastName",
        "bithDate",
        "country",
        "status",
        "actions"
    ];

    datasource: MatTableDataSource<Case> = new MatTableDataSource();

    datasourceSub: Subscription | undefined;

    constructor() {}

    ngOnInit(): void {
        this.datasourceSub = this.cases?.subscribe(items => {
            this.datasource.data = items;
        });
    }

    ngOnDestroy() {}
}
