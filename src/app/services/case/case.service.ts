import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Case } from "src/app/models/case";

@Injectable({
    providedIn: "root"
})
export class CaseService {
    constructor(private http: HttpClient) {}

    public getCases() {
        return this.http.get<Case[]>(`/cases`);
    }
}
