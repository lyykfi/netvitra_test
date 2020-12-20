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

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { LoginComponent } from "./components/login/login.component";
import { CasesComponent } from "./components/cases/cases.component";
import { FakeBackendInterceptor } from "./interceptors/fake-backend/fake-backend.interceptor";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CasesComponent,
        ToolbarComponent,
        MainLayoutComponent
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
        MatToolbarModule
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
