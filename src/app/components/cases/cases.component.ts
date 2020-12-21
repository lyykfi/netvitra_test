import { tap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Case } from "src/app/models/case";
import { CaseService } from "src/app/services/case/case.service";

@Component({
    selector: "app-cases",
    templateUrl: "./cases.component.html",
    styleUrls: ["./cases.component.less"]
})
export class CasesComponent implements OnInit {
    public cases$ = new Subject<Case[]>();

    constructor(private caseService: CaseService) {}

    ngOnInit(): void {
        this.caseService.getCases().subscribe(items => {
            this.cases$.next(items);
        });
    }
}
