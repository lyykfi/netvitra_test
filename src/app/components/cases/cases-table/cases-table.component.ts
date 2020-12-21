import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Case } from "src/app/models/case";

@Component({
    selector: "app-cases-table",
    templateUrl: "./cases-table.component.html",
    styleUrls: ["./cases-table.component.less"]
})
export class CasesTableComponent implements OnInit {
    @Input()
    public cases$: Subject<Case[]> | null = null;

    constructor() {}

    ngOnInit(): void {}
}
