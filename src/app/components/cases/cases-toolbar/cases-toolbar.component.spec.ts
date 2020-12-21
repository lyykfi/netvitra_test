import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CasesToolbarComponent } from "./cases-toolbar.component";

describe("CasesToolbarComponent", () => {
    let component: CasesToolbarComponent;
    let fixture: ComponentFixture<CasesToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CasesToolbarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CasesToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
