import { Component, OnInit } from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Subject, Subscription } from "rxjs";
import { Case } from "src/app/models/case";
import { CaseService } from "src/app/services/case/case.service";
import { CasesFilters } from "./cases-toolbar/cases-toolbar.component";

@AutoUnsubscribe()
@Component({
    selector: "app-cases",
    templateUrl: "./cases.component.html",
    styleUrls: ["./cases.component.less"]
})
export class CasesComponent implements OnInit {
    public cases$ = new Subject<Case[]>();

    public filteredSub: Subscription;

    public filteredCases$ = new Subject<Case[]>();

    public filters$ = new Subject<CasesFilters>();

    constructor(private caseService: CaseService) {
        this.filteredSub = this.cases$.subscribe(items => {
            this.filteredCases$.next(items);
        });
    }

    ngOnInit(): void {
        this.caseService.getCases().subscribe(items => {
            this.cases$.next(items);
        });
    }

    ngOnDestroy() {}

    updateFilters($event: CasesFilters) {
        this.filters$.next($event);
    }
}
