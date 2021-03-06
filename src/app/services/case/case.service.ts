import { first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/models/user";
import { BehaviorSubject } from "rxjs";
import { Case } from "src/app/models/case";

type TodoPreview = Omit<User, "birthDate">;

interface CaseUserResponse extends TodoPreview {
    birthDate: string;
}
interface CaseResponse extends Omit<Case, "user"> {
    user: CaseUserResponse;
}

@Injectable({
    providedIn: "root"
})
export class CaseService {
    private cases$ = new BehaviorSubject<Case[] | null>(null);

    constructor(private http: HttpClient) {}

    public getCases() {
        this.http
            .get<CaseResponse[]>(`/cases`)
            .pipe(first())
            .subscribe(items => {
                const newCases: Case[] = [];

                items.forEach(item => {
                    const newDate = item.user.birthDate
                        ? new Date(Date.parse(item.user.birthDate))
                        : null;

                    newCases.push({
                        ...item,
                        user: {
                            ...item.user,
                            birthDate: newDate
                        }
                    });
                });

                this.cases$.next(newCases);
            });

        return this.cases$;
    }

    public updateCaseById(id: number, caseItem: Case) {
        this.cases$.next(null);

        this.http
            .post<void>(`/cases`, {
                id,
                item: caseItem
            })
            .pipe(first())
            .subscribe(() => {
                this.getCases();
            });

        return this.cases$;
    }
}
