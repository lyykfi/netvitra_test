import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Case } from "src/app/models/case";
import { CaseService } from "src/app/services/case/case.service";

@Component({
    selector: "app-case-edit-dialog",
    templateUrl: "./case-edit-dialog.component.html",
    styleUrls: ["./case-edit-dialog.component.less"]
})
export class CaseEditDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CaseEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Case,
        private caseService: CaseService
    ) {}

    editForm = new FormGroup({
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        phoneNumber: new FormControl(""),
        birthDate: new FormControl("")
    });

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.editForm.patchValue({
            firstName: this.data.user.firstName,
            lastName: this.data.user.lastName,
            phoneNumber: this.data.user.phoneNumber,
            birthDate: this.data.user.birthDate
        });
    }

    onUpdate() {
        if (this.editForm.valid) {
            const id = this.data.id;

            this.caseService.updateCaseById(id, this.editForm.value);
            this.dialogRef.close();
        }
    }
}
