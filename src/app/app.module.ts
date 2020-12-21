import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { LoginComponent } from "./components/login/login.component";
import { CasesComponent } from "./components/cases/cases.component";
import { FakeBackendInterceptor } from "./interceptors/fake-backend/fake-backend.interceptor";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { CasesToolbarComponent } from "./components/cases/cases-toolbar/cases-toolbar.component";
import { CasesToolbarItemComponent } from "./components/cases/cases-toolbar/cases-toolbar-item/cases-toolbar-item.component";
import { CasesToolbarItemStatusComponent } from "./components/cases/cases-toolbar/cases-toolbar-item-status/cases-toolbar-item-status.component";
import { CasesToolbarItemCountryComponent } from "./components/cases/cases-toolbar/cases-toolbar-item-country/cases-toolbar-item-country.component";
import { SelectorComponent } from "./components/selector/selector.component";
import { CasesTableComponent } from "./components/cases/cases-table/cases-table.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CasesComponent,
        ToolbarComponent,
        SidenavComponent,
        CasesToolbarComponent,
        CasesToolbarItemComponent,
        CasesToolbarItemStatusComponent,
        CasesToolbarItemCountryComponent,
        SelectorComponent,
        CasesTableComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule
    ],
    providers: [
        MatIconRegistry,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
