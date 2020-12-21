import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CaseEditDialogComponent } from "./case-edit-dialog.component";

describe("CaseEditDialogComponent", () => {
    let component: CaseEditDialogComponent;
    let fixture: ComponentFixture<CaseEditDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CaseEditDialogComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
