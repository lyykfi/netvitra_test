/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { CasesToolbarItemCountryComponent } from "./cases-toolbar-item-country.component";

describe("CasesToolbarItemCountryComponent", () => {
    let component: CasesToolbarItemCountryComponent;
    let fixture: ComponentFixture<CasesToolbarItemCountryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CasesToolbarItemCountryComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CasesToolbarItemCountryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
