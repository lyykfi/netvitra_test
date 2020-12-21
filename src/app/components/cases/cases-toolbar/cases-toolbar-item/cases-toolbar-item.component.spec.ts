import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CasesToolbarItemComponent } from "./cases-toolbar-item.component";

describe("CasesToolbarItemComponent", () => {
    let component: CasesToolbarItemComponent;
    let fixture: ComponentFixture<CasesToolbarItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CasesToolbarItemComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CasesToolbarItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
