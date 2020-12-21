import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CasesToolbarItemStatusComponent } from "./cases-toolbar-item-status.component";

describe("CasesToolbarItemStatusComponent", () => {
    let component: CasesToolbarItemStatusComponent;
    let fixture: ComponentFixture<CasesToolbarItemStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CasesToolbarItemStatusComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CasesToolbarItemStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
